<?php

namespace Templately\API;

use stdClass;
use Templately\Utils\Helper;
use Templately\Utils\Database;
use Templately\Utils\Installer;
use WP_REST_Request;

use function current_user_can;


class Dependencies extends API {

	private $endpoint = 'dependencies';
	public $query = 'dependencies{ id, name, icon, plugin_file, plugin_original_slug, is_pro, link }';

	public function __construct() {
		parent::__construct();

		if(!empty($_GET['disable_redirect'])) {
			add_filter('wp_redirect', '__return_false', 999);
		}
	}

	public function permission_check( WP_REST_Request $request ) {
		$this->request = $request;
		// $_route = $request->get_route();

		// if( $_route === '/templately/v1/dependencies/install' && ! Helper::current_user_can( 'install_plugins' ) ) {
		// 	return Helper::error('invalid_permission', __( 'Sorry, you do not have permission to install a plugin.', 'templately' ), 'dependencies/install', 403 );
		// }

		return true;
	}

	public function register_routes() {
		$this->get( $this->endpoint, [ $this, 'get_dependencies' ] );
		$this->post( $this->endpoint  . '/plugins', [ $this, 'get_plugins' ] );
		$this->post( $this->endpoint  . '/themes', [ $this, 'get_themes' ] );
		$this->post( $this->endpoint . '/check', [$this, 'check_dependencies'] );
		$this->post( $this->endpoint . '/install', [$this, 'install_dependencies'] );
	}

	public function get_dependencies() {
		$dependencies = Database::get_transient( $this->endpoint );

		if( $dependencies ) {
			return $this->success( $dependencies );
		}

		$response = $this->http()->query(
			'dependencies',
			'id, name, icon, is_pro, platforms{ id, name, file_type, icon }'
		)->post();

		if( ! is_wp_error( $response ) ) {
			$_dependencies = [];
			if( ! empty( $response ) ) {
				$_dependencies[ 'unknown' ] = [];
				foreach( $response as $dependency ) {
					if( ! empty( $dependency['platforms'] ) ) {
						foreach( $dependency['platforms'] as $platform ) {
							if( ! isset( $_dependencies[ $platform['name'] ] ) ) {
								$_dependencies[ $platform['name'] ] = [];
							}
							$_dependencies[ $platform['name'] ][] = $dependency;
						}
					} else {
						$_dependencies[ 'unknown' ][] = $dependency;
					}
				}
			}

			Database::set_transient( $this->endpoint, $_dependencies );
			return $_dependencies;
		}

		return $response;
	}

	public function check_dependencies(){
		$dependencies = $this->get_param( 'dependencies', '', '' );
		$platform = $this->get_param( 'platform', 'elementor' );

		$_inactive_plugins = [];
		$_plugins = Helper::get_plugins();

		if( $platform === 'elementor' ) {
			$elementor_plugin              = new stdClass();
			$elementor_plugin->name        = __( 'Elementor', 'templately' );
			$elementor_plugin->plugin_file = 'elementor/elementor.php';
			$elementor_plugin->slug        = 'elementor';
			$elementor_plugin->is_pro      = false;
			$elementor_plugin->is_active   = Helper::is_plugin_active( 'elementor/elementor.php' );

			$_inactive_plugins[] = $elementor_plugin;
		}

		if ( ! empty( $dependencies ) && is_array( $dependencies ) ) {
			foreach ( $dependencies as $dependency ) {
				if( ! is_array( $dependency ) || ! isset( $dependency['plugin_file'] ) ) {
					continue;
				}

				$dependency  = ( object ) $dependency;
				if ( is_null( $dependency->plugin_file ) ) {
					continue;
				}

				$dependency->is_active = Helper::is_plugin_active( $dependency->plugin_file );

				if( isset( $dependency->plugin_original_slug ) ) {
					$dependency->slug = $dependency->plugin_original_slug;
					unset( $dependency->plugin_original_slug );
				}

				if ( $dependency->is_pro ) {
					if ( isset( $_plugins[ $dependency->plugin_file ] ) ) {
						unset( $dependency->is_pro );
						$dependency->message = __( 'You have the plugin installed.', 'templately' );
					}
				}
				$_inactive_plugins[] = $dependency;
			}
		}

		return [
			'dependencies' => $_inactive_plugins
		];
	}

	public function install_dependencies(){
		$requirements = $this->get_param( 'requirement', [], '' );
		if( empty( $requirements ) ) {
			return $this->error(
				'invalid_requirements',
				__('You have supplied an invalid requirements. Please reload the page and try again.'),
				'/install',
				400
			);
		}
		$installed = Installer::get_instance()->install( $requirements );
		if(empty($installed['success'])){
			return $this->error($installed['code'], $installed['message'], 'dependencies/install', 403 );
		}
		return $installed;
	}

	public function get_plugins() {
		require_once ABSPATH . 'wp-admin/includes/plugin.php';

		// Get parameters from request
		$dependencies = $this->get_param( 'dependencies', [], null );
		$platform = $this->get_param( 'platform', 'elementor' );
		$categories = $this->get_param( 'categories', [] );

		// Get all plugins for checking status
		$all_plugins = array();
		foreach ( get_plugins() as $file => $data ) {
			$plugin_data = array(
				'plugin'       => substr( $file, 0, - 4 ),
				'status'       => $this->get_plugin_status( $file ),
				'name'         => $data['Name'],
				'plugin_uri'   => $data['PluginURI'],
				'author'       => $data['Author'],
				'author_uri'   => $data['AuthorURI'],
				'description'  => array(
					'raw'      => $data['Description'],
					'rendered' => $data['Description'],
				),
				'version'      => $data['Version'],
				'network_only' => $data['Network'],
				'requires_wp'  => $data['RequiresWP'],
				'requires_php' => $data['RequiresPHP'],
				'textdomain'   => $data['TextDomain'],
			);
			$all_plugins[] = $plugin_data;
		}

		// Process dependencies and return only necessary data
		$new_dependency_list = [];
		$new_required_plugins = [];

		// Platform-specific plugins
		if ( $platform === 'elementor' ) {
			$elementor_plugin = $this->find_plugin_by_name( $all_plugins, 'elementor/elementor' );
			$e_plugin = array(
				'plugin_file' => 'elementor/elementor.php',
				'plugin_original_slug' => 'elementor',
				'name' => $elementor_plugin ? $elementor_plugin['name'] : 'Elementor',
				'installed' => $elementor_plugin ? ( $elementor_plugin['status'] === 'active' ) : false,
				'mustHave' => true,
			);
			$new_dependency_list[] = $e_plugin;
			if ( ! $elementor_plugin || $elementor_plugin['status'] !== 'active' ) {
				$new_required_plugins[] = $e_plugin;
			}
		} elseif ( $platform === 'gutenberg' ) {
			// Check if WordPress supports Gutenberg natively or if Gutenberg plugin is needed
			$gutenberg_plugin = $this->find_plugin_by_name( $all_plugins, 'gutenberg/gutenberg' );

			// Note: templately.is_wp_support_gutenberg is a frontend variable,
			// we'll assume Gutenberg plugin is needed if it exists and is inactive
			if ( $gutenberg_plugin && $gutenberg_plugin['status'] === 'inactive' ) {
				$g_plugin = array(
					'plugin_file' => 'gutenberg/gutenberg.php',
					'plugin_original_slug' => 'gutenberg',
					'name' => $gutenberg_plugin['name'],
					'mustHave' => true,
				);
				$new_dependency_list[] = $g_plugin;
				$new_required_plugins[] = $g_plugin;
			}
		}

		// Process template dependencies
		if ( ! empty( $dependencies ) && is_array( $dependencies ) ) {
			foreach ( $dependencies as $plugin_file => $plugin_obj ) {
				if ( ! is_array( $plugin_obj ) ) {
					continue;
				}

				$plugin_name = str_replace( '.php', '', $plugin_file );
				$plugin = $this->find_plugin_by_name( $all_plugins, $plugin_name );

				if ( $plugin && $plugin['status'] === 'active' ) {
					$plugin_obj['installed'] = true;
					$new_dependency_list[] = $plugin_obj;
				} else {
					$new_dependency_list[] = $plugin_obj;
					$new_required_plugins[] = $plugin_obj;
				}
			}
		}

		// Category-based plugins
		$included_categories = array(
			'blog-magazine',
			'construction',
			'ecommerce',
			'education',
			'entertainment',
			'fashion-lifestyle',
			'features-services',
			'food-restaurant',
			'marketing',
			'miscellaneous',
			'multipurpose',
			'nft-cryptocurrency',
			'non-profit',
			'technology',
			'travel',
		);

		$is_any_category_included = false;
		if ( ! empty( $categories ) && is_array( $categories ) ) {
			foreach ( $categories as $category ) {
				if ( isset( $category['slug'] ) && in_array( $category['slug'], $included_categories, true ) ) {
					$is_any_category_included = true;
					break;
				}
			}
		}

		if ( $is_any_category_included ) {
			$nx_plugin = $this->find_plugin_by_name( $all_plugins, 'notificationx/notificationx' );
			$notificationx = array(
				'name' => 'NotificationX',
				'icon' => 'https://ps.w.org/notificationx/assets/icon-256x256.gif?rev=2783824',
				'plugin_file' => 'notificationx/notificationx.php',
				'plugin_original_slug' => 'notificationx',
				'is_pro' => false,
				'installed' => $nx_plugin ? ( $nx_plugin['status'] === 'active' ) : false,
				'link' => 'https://wordpress.org/plugins/notificationx/',
			);
			$new_dependency_list[] = $notificationx;
			$new_required_plugins[] = $notificationx;
		}

		// EmbedPress for blog-magazine category
		$ep_is_any_category_included = false;
		if ( ! empty( $categories ) && is_array( $categories ) ) {
			foreach ( $categories as $category ) {
				if ( isset( $category['slug'] ) && $category['slug'] === 'blog-magazine' ) {
					$ep_is_any_category_included = true;
					break;
				}
			}
		}

		if ( $ep_is_any_category_included ) {
			$ep_plugin = $this->find_plugin_by_name( $all_plugins, 'embedpress/embedpress' );
			$embed_press = array(
				'name' => 'EmbedPress',
				'icon' => 'https://ps.w.org/embedpress/assets/icon-256x256.gif?rev=2783824',
				'plugin_file' => 'embedpress/embedpress.php',
				'plugin_original_slug' => 'embedpress',
				'is_pro' => false,
				'installed' => $ep_plugin ? ( $ep_plugin['status'] === 'active' ) : false,
				'link' => 'https://wordpress.org/plugins/embedpress/',
			);
			$new_dependency_list[] = $embed_press;
			$new_required_plugins[] = $embed_press;
		}

		return new \WP_REST_Response( array(
			'dependencyList' => $new_dependency_list,
			'requiredPlugins' => $new_required_plugins
		) );
	}

	/**
	 * Helper method to find a plugin by its name/slug
	 *
	 * @param array $plugins Array of all plugins
	 * @param string $plugin_name Plugin name to search for
	 * @return array|null Plugin data or null if not found
	 */
	private function find_plugin_by_name( $plugins, $plugin_name ) {
		foreach ( $plugins as $plugin ) {
			if ( $plugin['plugin'] === $plugin_name ) {
				return $plugin;
			}
		}
		return null;
	}

	public function get_themes() {
		// Get platform parameter from request
		$platform = $this->get_param( 'platform', 'elementor' );

		$active_themes = wp_get_themes();
		$current_theme = wp_get_theme();

		$recommended_theme = array();

		if ( $platform === 'elementor' ) {
			// Look for Hello Elementor theme
			$target_stylesheet = 'hello-elementor';
			$elementor_theme = null;

			foreach ( $active_themes as $theme ) {
				if ( $theme->get_stylesheet() === $target_stylesheet ) {
					$elementor_theme = $theme;
					break;
				}
			}

			$recommended_theme = array(
				'name' => $elementor_theme ? $elementor_theme->display( 'Name' ) : 'Hello Elementor',
				'status' => $elementor_theme ? ( $elementor_theme->get_stylesheet() === $current_theme->get_stylesheet() ? 'active' : 'inactive' ) : 'inactive',
				'template' => $elementor_theme ? $elementor_theme->get_template() : 'hello-elementor',
				'stylesheet' => $elementor_theme ? $elementor_theme->get_stylesheet() : 'hello-elementor',
			);

		} elseif ( $platform === 'gutenberg' ) {
			// Look for Twenty Twenty-Four theme
			$target_stylesheet = 'twentytwentyfour';
			$gutenberg_theme = null;

			foreach ( $active_themes as $theme ) {
				if ( $theme->get_stylesheet() === $target_stylesheet ) {
					$gutenberg_theme = $theme;
					break;
				}
			}

			$recommended_theme = array(
				'name' => $gutenberg_theme ? $gutenberg_theme->display( 'Name' ) : 'Twenty Twenty-Four',
				'status' => $gutenberg_theme ? ( $gutenberg_theme->get_stylesheet() === $current_theme->get_stylesheet() ? 'active' : 'inactive' ) : 'inactive',
				'template' => $gutenberg_theme ? $gutenberg_theme->get_template() : 'twentytwentyfour',
				'stylesheet' => $gutenberg_theme ? $gutenberg_theme->get_stylesheet() : 'twentytwentyfour',
			);
		}

		return new \WP_REST_Response( $recommended_theme );
	}

	/**
	 * Get's the activation status for a plugin.
	 *
	 * @since 5.5.0
	 *
	 * @param string $plugin The plugin file to check.
	 * @return string Either 'active' or 'inactive'.
	 */
	protected function get_plugin_status( $plugin ) {
		if ( is_plugin_active_for_network( $plugin ) ) {
			return 'active';
		}

		if ( is_plugin_active( $plugin ) ) {
			return 'active';
		}

		return 'inactive';
	}

}