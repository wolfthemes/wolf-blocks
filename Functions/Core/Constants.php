<?php
/**
 * Constants Manager
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Constants {

	public const VERSION     = '1.0.0';
	public const TEXT_DOMAIN = 'wolf-blocks';

	public static function define( string $plugin_path, string $plugin_url ): void {
		$constants = array(
			'WOLF_BLOCKS_DIR'     => $plugin_path,
			'WOLF_BLOCKS_URI'     => $plugin_url,
			'WOLF_BLOCKS_VERSION' => self::VERSION,
		);

		foreach ( $constants as $name => $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value ); // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.VariableConstantNameFound
			}
		}
	}
}
