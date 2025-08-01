<?php

namespace Templately\Core\Importer\Runners;


use Exception;
use Templately\Core\Importer\Utils\Utils;
use Templately\Utils\Helper;

class Finalizer extends BaseRunner {
	private $options       = [];
	private $type_to_check = [ 'templates', 'content' ];
	private $imported_data;

	private $type     = '';
	private $sub_type = '';
	private $extra_content;

	private $total_counts    = 0;

	/**
	 * @var array|mixed
	 */
	protected $map_post_ids = [];
	/**
	 * @var array|mixed
	 */
	protected $map_term_ids = [];

	public function get_name(): string {
		return 'finalize';
	}

	public function get_label(): string {
		return __( 'Finalizing Your Imports', 'templately' );
	}

	public function log_message(): string {
		return __( 'Finalizing Your Imports', 'templately' );
	}

	public function should_run( $data, $imported_data = [] ): bool {
		$data = [];

		foreach ( $this->type_to_check as $type ) {
			$contents = ! empty ( $this->manifest[ $type ] ) ? $this->manifest[ $type ] : [];
			if ( $type == 'templates' ) {
				$this->prepare( $data, $contents, $type );
			} else {
				foreach ( $contents as $post_type => $templates ) {
					$this->prepare( $data, $templates, $type, $post_type );
				}
			}
		}
		$this->options = &$data;

		return ! empty( $data ) || $this->platform == 'gutenberg';
	}

	private function prepare( &$data, $templates, $type, $sub_type = null ) {
		if ( empty( $templates ) || ! is_array( $templates ) ) {
			return;
		}
		foreach ( $templates as $id => $template ) {
			if ( ! isset( $template['data'] ) && !isset( $template['__attachments']) && !isset($template['has_logo']) ) {
				continue;
			}

			// if ( ! isset( $template['data']['form'] ) && ! isset( $template['data']['nav_menus'] )) {
			// 	continue;
			// }

			$this->total_counts += 1;

			if ( $sub_type ) {
				$data[ $type ][ $sub_type ][ $id ] = $template;
			} else {
				$data[ $type ][ $id ] = $template;
			}
		}
	}

	public function import( $data, $imported_data ): array {
		$this->imported_data = &$imported_data;

		$this->json->imported_data = $this->imported_data;
		$this->json->map_post_ids  = Utils::map_old_new_post_ids( $this->imported_data );
		$this->json->map_term_ids  = Utils::map_old_new_term_ids( $this->imported_data );
		if ( ! empty( $imported_data['extra-content'] ) ) {
			$this->extra_content = $imported_data['extra-content'];
		}

		add_action('templately_import.finalize_gutenberg_attachment', [$this, 'post_log'], 10, 2);

		$this->loop( $this->options, function($type, $contents ) {
			$this->type = $type;

			if ( $type == 'templates' ) {
				$this->finalize_imports( $contents, $type );
			} else {
				$this->loop( $contents, function($post_type, $templates ) use($type) {
					$this->sub_type = $post_type;
					$this->finalize_imports( $templates, $type, $post_type );
				}, $type);
			}
		});

		if ( $this->platform == 'gutenberg' ) {
			$this->regenerate_assets();
		}

		return [];
	}

	private function regenerate_assets() {
		$upload_dir = wp_upload_dir();
		if ( is_dir( $upload_dir['basedir'] . '/eb-style/' ) ) {
			array_map( 'unlink', glob( $upload_dir['basedir'] . '/eb-style/*.min.css' ) );
			rmdir( $upload_dir['basedir'] . '/eb-style/' );
		}
	}

	private function finalize_imports( $templates, $type, $post_type = null ) {
		// used for counting

		$this->loop( $templates, function($old_template_id, $template_settings ) use($type, $post_type) {
			$processed = $this->get_progress([], 'finalized_imports', false);
			try {
				$path = $this->dir_path . $this->type . DIRECTORY_SEPARATOR;
				if ( ! empty( $this->sub_type ) ) {
					$path .= $this->sub_type . DIRECTORY_SEPARATOR;
				}

				if($post_type && isset($this->imported_data[$type]['__attachments'][$post_type][$old_template_id])){
					$template_settings['__attachments'] = $this->imported_data[$type]['__attachments'][$post_type][$old_template_id];
				}
				else if(empty($post_type) && isset($this->imported_data[$type]['__attachments'][$old_template_id])){
					$template_settings['__attachments'] = $this->imported_data[$type]['__attachments'][$old_template_id];
				}

				$path          .= "{$old_template_id}.json";
				$template_json = Utils::read_json_file( $path );
				$params = $this->origin->get_request_params();
				$this->json->prepare( $template_json, $template_settings, $this->extra_content['form'][ $old_template_id ] ?? [], $params )->update();

				$processed[] = $old_template_id;
				// Add the template to the processed templates and update the session data
				$this->update_progress( $processed, null, 'finalized_imports', false);
				// Broadcast Log
				$progress = floor( ( 100 * count($processed) ) / $this->total_counts );
				if(empty($progress)){
					$xyz = 0;
				}
				$this->log( $progress );

			} catch ( Exception $e ) {

			}


		}, "$type-$post_type");
	}

	public function post_log($id, $size_dimension = null){
		$this->log(-1, "Imported attachment: $id" . ( $size_dimension ? " - $size_dimension" : ''), 'eventLog');
	}
}