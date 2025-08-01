<?php

namespace Templately\Core\Importer;

use Exception;
use Templately\Core\Importer\Runners\Attachments;
use Templately\Core\Importer\Runners\BaseRunner;
use Templately\Core\Importer\Runners\Customizer;
use Templately\Core\Importer\Runners\Dependencies;
use Templately\Core\Importer\Runners\ElementorContent;
use Templately\Core\Importer\Runners\ExtraContent;
use Templately\Core\Importer\Runners\Finalizer;
use Templately\Core\Importer\Runners\GutenbergContent;
use Templately\Core\Importer\Runners\Loop;
use Templately\Core\Importer\Runners\Templates;
use Templately\Core\Importer\Runners\WPContent;

class Import {
	use LogHelper;
	use Loop;


	/**
	 * @var array
	 */
	private $manifest;

	private $runners;
	private $request_params;
	private $session_id;

	private $imported_data = [];

	/**
	 * @throws Exception
	 */
	public function __construct( $args ) {
		$this->request_params = $args;
		$this->manifest = $args['manifest'];
		$this->session_id = $args['session_id'];

		$this->register_runners();
	}

	/**
	 * @throws Exception
	 */
	private function register_runners() {
		$this->runners = [
			// TODO: Site Settings Import Runner
			new Dependencies( $this->request_params ),
			new Attachments( $this->request_params ),
			new Customizer( $this->request_params ),
			new ExtraContent( $this->request_params ),
			new Templates( $this->request_params ),
			new GutenbergContent( $this->request_params ),
			new ElementorContent( $this->request_params ),
			new WPContent( $this->request_params ),
			new Finalizer( $this->request_params )
		];
	}

	public function run( $callable = null ): array {
		$data = $this->request_params;

		// Get the cached imported_data
		// $this->imported_data = $data['imported_data'] ?? [];

		/**
		 * @var BaseRunner $runner
		 */
		$imported_data = $this->loop( $this->runners, function($id, $runner, $imported_data ) use($data) {
			$import = [];

			try{
				if ( $runner->should_run( $data, $imported_data ) ) {
					$progress = $this->get_progress();
					if(!in_array($runner->get_name(), $progress)){
						$runner->log( 0 );
						$progress[] = $runner->get_name();
						$this->update_progress( $progress);
					}
					$import        = $runner->import( $data, $imported_data );
					$imported_data = array_merge_recursive( $imported_data, $import );

					if( $runner->get_name() != 'finalize' ) {
						$runner->log( 100 );
					} else {
						$runner->log( 100, $runner->log_message() );
					}
				}
			}catch (Exception $e){
				error_log($e->getMessage());
			}

			return $imported_data;
		}, null, true);

		return $imported_data;
	}

	public function get_runners() {
		return $this->runners;
	}
}