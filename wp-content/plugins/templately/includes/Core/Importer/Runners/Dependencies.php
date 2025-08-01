<?php

namespace Templately\Core\Importer\Runners;

use Exception;
use Templately\Core\Importer\Form;
use Templately\Core\Importer\Runners\BaseRunner;
use Templately\Core\Importer\Utils\Utils;
use Templately\Utils\Helper;
use Templately\Utils\Installer;

class Dependencies extends BaseRunner {

	public function get_name(): string {
		return 'dependencies';
	}

	public function get_label(): string {
		return __( 'Download Dependencies', 'templately' );
	}

	public function should_log(): bool {
		return true;
	}

	public function get_action(): string {
		return 'eventLog';
	}

	public function log_message(): string {
		return __( 'Updating customizer settings.', 'templately' );
	}

	public function should_run( $data, $imported_data = [] ): bool {
		return ! empty( $data['theme'] ) || ! empty( $data['plugins'] );
	}

	public function import( $data, $imported_data ): array {
		$dependency_data = [];
  		/**
		 * Checking & Installing Plugin Dependencies
		 */
		$dependency_data['theme']   = $this->install_themes($data);
		$dependency_data['plugins'] = $this->install_plugins($data);


		return  ['dependency_data' => $dependency_data];
	}

	private function install_plugins($request_params) {
		$progress = $request_params['progress'] ?? [];
		$results = [];

		if ( ! empty( $request_params['plugins'] ) && is_array( $request_params['plugins'] ) ) {
			// $this->sse_log( 'plugin', 'Installing Plugins', 1 );
			$total_plugin = count($request_params['plugins']);

			// $total_plugin_installed = $total_plugin;
			// $_installed_plugins     = $request_params['dependency_data']['plugins']['_installed_plugins'] ?? 0;
			$progress['plugin_dependency'] = $progress['plugin_dependency'] ?? [];

			// $this->before_install_hook();
			// error_log(print_r($request_params['plugins'], true), 3, ABSPATH . 'wp-content/debug.log');

			$results = $this->loop( $request_params['plugins'], function( $key,  $dependency, $results ) use(&$_installed_plugins, $total_plugin) {
				error_log(print_r([$key,  $dependency['name']], true), 3, ABSPATH . 'wp-content/debug.log');

				$_installed_plugins = $results['_installed_plugins'] ?? 0;

				// $result = [];
				$this->sse_log( 'plugin', 'Installing Required Plugins: ' . $dependency['name'], floor( ( 100 * $_installed_plugins / $total_plugin ) ) );

				$_dependency        = $dependency;
				$is_installed       = Helper::is_plugins_installed($dependency['plugin_file']);
				$dependency['slug'] = $dependency['plugin_original_slug'];
				$plugin_status      = Installer::get_instance()->install($dependency);

				if (!$plugin_status['success']) {
					$this->sse_message([
						'position' => 'plugin',
						'action'   => 'updateLog',
						'status'   => 'error',
						'message'  => 'Installation Failed: ' . $dependency['name'] . ' (' . ($plugin_status['message'] ?? '') . ')',
						'type'     => "plugin_{$dependency['plugin_original_slug']}",
						'progress' => 0
					]);

					if (isset($dependency['mustHave']) && $dependency['mustHave']) {
						$this->removeLog('plugin');
						$this->throw('Installation Failed: ' . $dependency['name'] . ' (' . ($plugin_status['message'] ?? '') . ')');
					}

					$results['plugins']['failed'][] = [
						'name'    => $dependency['name'],
						'slug'    => $dependency['slug'],
						'link'    => $dependency['link'],
						'message' => $plugin_status['message'] ?? ''
					];
				} else {
					$_installed_plugins++;
					// $total_plugin_installed--;

					$results['_installed_plugins'] = $_installed_plugins;
				}

				return $results;
			}, null, true);

			// $this->after_install_hook();

			$this->sse_message([
				'action'   => 'updateLog',
				'status'   => 'complete',
				'message'  => "Installed Required Plugins ({$results['_installed_plugins']}/$total_plugin)",
				'type'     => "plugin",
				'progress' => 100
			]);
			$results['total'] = $total_plugin;
			$results['succeed'] = $results['_installed_plugins'];
		} else {
			$this->removeLog('plugin');
		}



		return $results;
	}

	private function install_themes($request_params) {
		$themes = [];


		if ( ! empty( $request_params['theme'] ) && is_array( $request_params['theme'] ) ) {
			$themes = [$request_params['theme']];
		}
		else {
			$this->removeLog( 'theme' );
		}
			// $this->before_install_hook();

		$results = $this->loop($themes, function($key, $theme) {
			$result = [];
			if (isset($theme['stylesheet'])) {
				$stylesheet = get_option('stylesheet');

				// do_action('before_theme_activation', $theme); // Trigger action before theme activation
				$this->sse_log('theme', 'Installing and Activating Theme: ' . $theme['name'], 0);
				if (!get_option("__templately_stylesheet")) {
					add_option("__templately_stylesheet", $stylesheet, '', 'no');
				}

				$plugin_status      = Installer::get_instance()->install_and_activate_theme($theme['stylesheet']);

				if (!$plugin_status['success']) {
					$this->sse_message([
						'action'   => 'updateLog',
						'status'   => 'error',
						'message'  => "Failed to activate theme: " . $theme['name'],
						'type'     => "theme",
						'progress' => 0
					]);
					$result = [
						'success' => false,
						'name'    => $theme['name'],
						'slug'    => $theme['stylesheet'],
						'message' => $plugin_status['message'] ?? ''
					];
				} else {
					// do_action('after_theme_activation', $theme); // Trigger action after theme activation

					$this->sse_message([
						'action'   => 'updateLog',
						'status'   => 'complete',
						'message'  => "Activated theme: " . $theme['name'],
						'type'     => "theme",
						'progress' => 100
					]);
					$result = [
						'success' => true,
						'name'    => $theme['name'],
						'slug'    => $theme['stylesheet'],
						'message' => $plugin_status['message'] ?? ''
					];
					$progress['theme_dependency'] = true;
				}

			}
			return $result;
		});


		return $results;
	}
}