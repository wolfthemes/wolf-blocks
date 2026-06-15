<?php
/**
 * Block Loader — discovers and registers all blocks from the build directory.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Block_Loader {

	public function __construct() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	public function register_blocks(): void {
		$blocks = array(
			'marquee',
			'stats-counter',
			'testimonial-card',
			'pricing-table',
		);

		foreach ( $blocks as $block ) {
			$path = WOLF_BLOCKS_DIR . '/build/blocks/' . $block;
			if ( file_exists( $path . '/block.json' ) ) {
				register_block_type( $path );
			}
		}
	}
}
