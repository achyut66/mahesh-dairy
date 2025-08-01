<?php

namespace Templately\Core\Importer\Runners;

use Exception;
use Templately\Core\Importer\Form;
use Templately\Core\Importer\Runners\BaseRunner;
use Templately\Core\Importer\Utils\Utils;

class DownloadZip extends BaseRunner {

	public function get_name(): string {
		return 'downloadzip';
	}

	public function get_label(): string {
		return __( 'Download Zip', 'templately' );
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
		$params = $this->origin->get_request_params();
		return ! empty( $params['title'] ) || !empty( $params['slogan'] );
	}

	public function import( $data, $imported_data ): array {
        /**
         * Download the zip
         */
        $this->download_zip( $_id );

        $progress['download_zip'] = true;
        $this->update_session_data( [
            'progress' => $progress,
        ] );
        $this->sse_message( [
            'type'    => 'continue',
            'action'  => 'continue',
            'info'    => 'download_zip',
            'results' => __METHOD__ . '::' . __LINE__,
        ] );

		return  [ 'customizer' => $customizer ];
	}

	/**
	 * @throws Exception
	 */
	private function download_zip( $id ) {
		$this->sse_log( 'download', __( 'Downloading Template Pack', 'templately' ), 1 );
		$response = wp_remote_get( $this->get_api_url( "v2", "import/pack/$id" ), [
			'timeout' => 30,
			'headers' => [
				'Content-Type'         => 'application/json',
				'Authorization'        => 'Bearer ' . $this->api_key,
				'x-templately-ip'      => Helper::get_ip(),
				'x-templately-url'     => home_url('/'),
				'x-templately-version' => TEMPLATELY_VERSION,
			]
		]);

		$response_code = wp_remote_retrieve_response_code($response);
		$content_type  = wp_remote_retrieve_header($response, 'content-type');
		$this->download_key  = wp_remote_retrieve_header($response, 'download-key');

		if (is_wp_error($response)) {
			$this->throw_retryable(__('Template pack download failed', 'templately') . $response->get_error_message());
		} else if ($response_code != 200) {
			if (strpos($content_type, 'application/json') !== false) {
				// Retrieve Data from Response Body.
				$response_body = json_decode(wp_remote_retrieve_body($response), true);

				// If the response body is JSON and it contains an error, throw an exception with the error message
				if (isset($response_body['status']) && $response_body['status'] === 'error') {
					$support_message = '';
					if(strpos($response_body['message'], 'https://wpdeveloper.com/support') === false){
						$support_message = sprintf(__(" Please try again or contact <a href='%s' target='_blank'>support</a>.", "templately"), 'https://wpdeveloper.com/support');
					}
					$this->throw_non_retryable($response_body['message'] . $support_message);
				}
			}
			$this->throw_unknown(__('Template pack download failed with response code: ', 'templately') . $response_code);
		}

		$this->sse_log('download', __('Downloading Template Pack', 'templately'), 57);

		// $session_id       = uniqid();
		$this->dir_path   = $this->tmp_dir . $this->session_id . DIRECTORY_SEPARATOR;
		$this->filePath   = $this->tmp_dir . "{$this->session_id}.zip";
		// $this->session_id = $session_id;

		$this->update_session_data([
			'session_id'   => $this->session_id,
			'dir_path'     => $this->dir_path,
			'download_key' => $this->download_key,
		]);

		if (file_put_contents($this->filePath, $response['body'])) { // phpcs:ignore
			$this->sse_log('download', __('Downloading Template Pack', 'templately'), 100);

			$this->unzip();
		} else {
			$this->throw_retryable(__('Downloading Failed. Please try again', 'templately'));
		}
	}

}