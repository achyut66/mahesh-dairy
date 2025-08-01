<?php

namespace Templately\Admin\API;

use Elementor\Core\Files\Fonts\Google_Font;
use Elementor\Plugin;
use WP_REST_Request;

class Settings extends BaseAPI {
	private $endpoint = 'settings';



	/**
	 * @param $request WP_REST_Request for getting all route request in time.
	 *
	 * @return WP_Error|boolean
	 */
	public function permission_check( WP_REST_Request $request ) {
		$this->request = $request;
		if(!current_user_can('manage_options')){
			return false;
		}
		return true;
	}

	public function register_routes() {
		$this->post( $this->endpoint . '/update', [$this, 'update_settings'] );
	}

	public function update_settings() {
		$_settings   = $this->request->get_param('settings');
		$platform    = $_settings['platform'] ?? '';
		$siteTitle   = $_settings['siteTitle'] ?? '';
		$siteTagline = $_settings['siteTagline'] ?? '';
		$customCSS   = $_settings['customCSS'] ?? '';

		update_option('blogname', $siteTitle);
		update_option('blogdescription', $siteTagline);
		update_option('templately_custom_css', $customCSS);

		$this->update_logo();

		if($platform === 'elementor'){
			if(class_exists('Elementor\Plugin')){
				$this->update_elementor_settings($_settings);
			}
		}
		else if($platform === 'gutenberg'){
			$this->update_gutenberg_settings($_settings);
		}

		return $this->success( ['message' => 'Settings updated successfully'] );
	}

	public function update_logo() {
		$_settings   = $this->request->get_param('settings');
		$logo        = $_settings['logoImage'] ?? [];

		if(!empty($logo['id'])){
			set_theme_mod( 'custom_logo', $logo['id'] );
			update_option( 'site_logo', $logo['id'] );

			// Update Elementor kit if Elementor is enabled
			if(class_exists('Elementor\Plugin')){
				$kit = \Elementor\Plugin::$instance->kits_manager->get_active_kit();
				if($kit){
					$settings = $kit->get_settings();
					$settings['site_logo'] = $logo;
					$kit->update_settings($settings);
				}
			}
		}
		else{
			remove_theme_mod( 'custom_logo' );
			delete_option( 'site_logo' );

			// Remove logo from Elementor kit if Elementor is enabled
			if(class_exists('Elementor\Plugin')){
				$kit = \Elementor\Plugin::$instance->kits_manager->get_active_kit();
				if($kit){
					$settings = $kit->get_settings();
					unset($settings['site_logo']);
					$kit->update_settings($settings);
				}
			}
		}

		return true;
	}

	private function update_gutenberg_settings($_settings){
		$colors     = $_settings['colors'] ?? [];
		$typography = $_settings['typography'] ?? [];
		$settings   = get_option('eb_global_styles', []);
		$settings   = is_array($settings) ? $settings: [];
		$settings   = array_map(function($item) { return json_decode($item, true); }, $settings);


		if(!empty($colors)){
			if (isset($settings['global_colors'])) {
				foreach ($settings['global_colors'] as $key => $color) {
					$settings['global_colors'][$key]['color'] = $colors[$color['var']] ?? $color['color'];
				}
			}

			if (isset($settings['custom_colors'])) {
				foreach ($settings['custom_colors'] as $key => $color) {
					$settings['custom_colors'][$key]['color'] = $colors[$color['var']] ?? $color['color'];
				}
			}
		}

		if(!empty($typography)){
			$settings["global_typography"] = $typography;
		}

		$settings = array_map('json_encode', $settings);
		update_option('eb_global_styles', $settings);
	}

	private function update_elementor_settings($_settings){
		$colors      = $_settings['colors'] ?? [];
		$typography  = $_settings['typography'] ?? [];

		$kit = Plugin::$instance->kits_manager->get_active_kit();
		if($kit){
			$settings = $kit->get_settings();
			$settings['site_logo'] = $_settings['logoImage'];

			if(!empty($colors)){
				if (!empty($settings['system_colors'])) {
					foreach ($settings['system_colors'] as $key => $color) {
						$settings['system_colors'][$key]['color'] = $colors[$color['_id']] ?? $color['color'];
					}
				}
				if (!empty($settings['custom_colors'])) {
					foreach ($settings['custom_colors'] as $key => $color) {
						$settings['custom_colors'][$key]['color'] = $colors[$color['_id']] ?? $color['color'];
					}
				}
			}



			if(!empty($typography)){
				if (!empty($settings['system_typography'])) {
					foreach ($settings['system_typography'] as $key => $typo) {
						if(!empty($typography[$typo['_id']])){
							$settings['system_typography'][$key] = array_merge($typo, $typography[$typo['_id']]);
							if(class_exists('Elementor\Core\Files\Fonts\Google_Font') && !empty($typo['typography_font_family'])){
								Google_Font::enqueue( $typo['typography_font_family'] );
							}
						}
					}
				}
				if (!empty($settings['custom_typography'])) {
					foreach ($settings['custom_typography'] as $key => $typo) {
						if(!empty($typography[$typo['_id']])){
							$settings['custom_typography'][$key] = array_merge($typo, $typography[$typo['_id']]);
							if(class_exists('Elementor\Core\Files\Fonts\Google_Font') && !empty($typo['typography_font_family'])){
								Google_Font::enqueue( $typo['typography_font_family'] );
							}
						}
					}
				}
			}

			$kit->update_settings($settings);
			$settings = $kit->get_settings();

			Plugin::$instance->files_manager->clear_cache();
			return $settings;
		}



	}
}
