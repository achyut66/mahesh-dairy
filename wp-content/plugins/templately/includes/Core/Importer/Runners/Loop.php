<?php

namespace Templately\Core\Importer\Runners;

use Templately\Core\Importer\FullSiteImport;
use Templately\Core\Importer\LogHelper;
use Templately\Core\Importer\Utils\Utils;
use Templately\Utils\Helper;

/**
 * @method string get_name()
 * @method void sse_message(array $data)
 */
trait Loop {

	/**
	 * Undocumented function
	 *
	 * @param [type] $items
	 * @param [type] $callback($key, $item, $results)
	 * @param [type] $unique_id
	 * @param boolean $split_to_chunks
	 * @return array
	 */
	public function loop($items, $callback, $unique_id = null, $split_to_chunks = false) {
		// throw error if the callback is not callable
		if (!is_callable($callback)) {
			throw new \Exception('The callback is not callable');
		}
		if (!is_array($items)) {
			throw new \Exception('The items should be an array');
		}

		$results  = $this->_get_result([], $unique_id);
		$progress = $this->_get_progress([], $unique_id);


		if(!empty($this->backup_attributes)){
			$this->_retrieve_attributes($this->backup_attributes, $unique_id);
		}

		foreach ($items as $key => $item) {
			// If the template has been processed, skip it
			if (in_array("key_$key", $progress, true)) {
				continue;
			}

			$result  = $callback($key, $item, $results);
			$results = Helper::recursive_wp_parse_args($result, $results);


			// Add the template to the processed templates and update the session data
			$progress[] = "key_$key";
			$this->_update_progress( $progress, $result, $unique_id);

			// If it's not the last item, send the SSE message and exit

			$is_last_runner = key( array_slice( $items, -1, 1, true ) ) === $key;

			if( (Helper::fsi_should_exit() || $split_to_chunks) && !$is_last_runner && method_exists($this, 'sse_message') ) {
				if(!empty($this->backup_attributes)){
					$this->_backup_attributes($this->backup_attributes, $unique_id);
				}
				$this->sse_message( [
					'type'    => 'continue',
					'action'  => 'continue',
					'name'    => method_exists($this, 'get_name') ? $this->get_name() : '',
					'index'   => $key,
					'results' => (function() use ($unique_id) {$this->CallingFunctionName($unique_id);})(),
				] );
				exit;
			}
		}
		return $results;
	}

	private function CallingFunctionName($id = null, $function = true, $line = false, $level = 3) {
		$return = 'unknown';
		$trace = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT, ($level + 1));

		// Check if the trace has at least three elements
		if (isset($trace[$level])) {
			$final_call = $trace[$level];
			$return = '';

			if (isset($final_call['object'])) {
				$return .= get_class($final_call['object']);
			} elseif (isset($final_call['class'])) {
				$return .= $final_call['class'];
			}

			if ($function && isset($final_call['function'])) {
				$return .= ($return ? '::' : '') . $final_call['function'];
			}

			if ($line && isset($final_call['line'])) {
				$return .= ($return ? '::' : '') . $final_call['line'];
			}

			if (!empty($id)) {
				$return .= ($return ? '::' : '') . $id;
			}

			if (!$return) {
				$return = 'unknown';
			}
		}
		// error_log($return . PHP_EOL, 3, ABSPATH . 'wp-content/debug.log');

		return $return;
	}

	private function _get_progress($defaults = [], $unique_id = null, $function = true) {
		$data = $this->get_session_data();
		$calling_class = $this->CallingFunctionName($unique_id, $function);
		if(isset($data['loop']['progress'][$calling_class])){
			return $data['loop']['progress'][$calling_class];
		}
		else if(!empty($defaults)){
			$this->_update_progress($defaults, null, $unique_id, $function);
		}
		return $defaults;
	}


	public function get_progress($defaults = [], $unique_id = null, $function = true) {
		return $this->_get_progress($defaults, $unique_id, $function);
	}


	private function _get_result($defaults = [], $unique_id = null, $function = true) {
		$data = $this->get_session_data();
		$calling_class = $this->CallingFunctionName($unique_id, $function);
		if(isset($data['loop']['result'][$calling_class])){
			return $data['loop']['result'][$calling_class];
		}
		return $defaults;
	}

	public function get_result($defaults = [], $unique_id = null, $function = true) {
		return $this->_get_result($defaults, $unique_id, $function);
	}


	private function _update_progress( $progress, $imported_data = null, $unique_id = null, $function = true ): bool {
		$calling_class = $this->CallingFunctionName($unique_id, $function);
		$old_data = $this->get_session_data();

		$new_data = [];

		if($progress !== null){
			$new_data['loop']['progress'] = [$calling_class => $progress];
		}
		if($imported_data !== null){
			$new_data['loop']['result']   = [$calling_class => $imported_data];
		}

		$new_data = Helper::recursive_wp_parse_args( $new_data, $old_data );
		return $this->update_session_data( $new_data );
	}

	public function update_progress( $progress, $imported_data = null, $unique_id = null, $function = true ): bool {
		return $this->_update_progress( $progress, $imported_data, $unique_id, $function );
	}

	// Modified get_session_data to use the static version
	protected function get_session_data(): array {
		return Utils::get_session_data($this->session_id);
	}

	// Modified update_session_data to use the static version
	protected function update_session_data($data): bool {
		return Utils::update_session_data($this->session_id, $data);
	}

	private function _retrieve_attributes($attributes, $unique_id){
		$calling_class = $this->CallingFunctionName($unique_id, false);

		$data = $this->get_session_data();
		if(isset($data['loop']['backup_attributes'][$calling_class])){
			$attr_values = $data['loop']['backup_attributes'][$calling_class];
			foreach ($attributes as $attribute) {
				if(isset($attr_values[$attribute])){
					$this->$attribute = $attr_values[$attribute];
				}
			}
		}
	}

	private function _backup_attributes($attributes, $unique_id){
		$calling_class = $this->CallingFunctionName($unique_id, false);
		$old_data = $this->get_session_data();

		$new_data    = [];
		$attr_values = [];

		foreach ($attributes as $attribute) {
			if(isset($this->$attribute)){
				$attr_values[$attribute] = $this->$attribute;
			}
		}

		$new_data['loop']['backup_attributes'] = [$calling_class => $attr_values];


		// @todo: not sure if we need this.
		$new_data = Helper::recursive_wp_parse_args( $new_data, $old_data );
		return $this->update_session_data( $new_data );
	}

}