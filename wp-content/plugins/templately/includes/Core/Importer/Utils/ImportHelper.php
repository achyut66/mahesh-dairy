<?php

namespace Templately\Core\Importer\Utils;

use Templately\Core\Importer\LogHelper;
use Templately\Core\Importer\Runners\Loop;

/**
 * @property $imported_data []
 * @property $map_post_ids []
 * @property $map_term_ids []
 */
abstract class ImportHelper {
	use LogHelper;
	use Loop;
	protected $imported_data = [];

	public $map_post_ids = [];

	public $map_term_ids = [];

	public $session_id;

	public function __set( $key, $value ) {
		if ( property_exists( $this, $key ) ) {
			$this->{$key} = $value;
		}
	}
}