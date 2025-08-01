<?php

namespace Templately\Admin;

use Templately\Utils\Base;
use Templately\Utils\Helper;

class Settings extends Base  {

	public function __construct() {
		add_action('admin_menu', [$this, 'admin_menu']);
		add_action('wp_head', [$this, 'add_custom_css']);
	}

	public function admin_menu() {
		add_submenu_page( 'templately', 'Settings', 'Settings', 'delete_posts', 'templately_settings', [$this, 'display_settings'], '58.7' );
	}


	public function display_settings() {
		Helper::views( 'settings' );
	}

	public function add_custom_css() {
		$custom_css = get_option('templately_custom_css');
		if($custom_css){
			echo "\n<style id='templately-custom-css'>\n".$custom_css."\n</style>\n";
		}
	}
}
