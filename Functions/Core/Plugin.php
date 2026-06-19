<?php
/**
 * Main Plugin Class
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Plugin {

	private static ?Plugin $instance = null;

	public static function get_instance(): Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		Constants::define( $this->get_plugin_path(), $this->get_plugin_url() );
		$this->init_hooks();
	}

	private function __clone() {}

	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton' );
	}

	private function init_hooks(): void {
		add_action( 'init', array( $this, 'init' ), 0 );
	}

	public function init(): void {
		new Block_Loader();
		new Mailchimp_Rest();
		new Mailchimp_Settings();
	}

	public function get_plugin_url(): string {
		return untrailingslashit( plugins_url( '/', dirname( __DIR__, 2 ) . '/wolf-blocks.php' ) );
	}

	public function get_plugin_path(): string {
		return untrailingslashit( plugin_dir_path( dirname( __DIR__, 2 ) . '/wolf-blocks.php' ) );
	}

	public function get_version(): string {
		return Constants::VERSION;
	}
}
