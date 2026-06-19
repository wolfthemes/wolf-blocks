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
			'comparison-table',
			'feature-grid',
			'feature-grid-item',
		);

		$this->register_mailchimp_form();

		foreach ( $blocks as $block ) {
			$path = WOLF_BLOCKS_DIR . '/build/blocks/' . $block;
			if ( file_exists( $path . '/block.json' ) ) {
				register_block_type( $path );
			}
		}

		$this->register_countdown();
	}

	private function register_mailchimp_form(): void {
		$path = WOLF_BLOCKS_DIR . '/build/blocks/mailchimp-form';
		if ( ! file_exists( $path . '/block.json' ) ) {
			return;
		}
		register_block_type(
			$path,
			array(
				'render_callback' => array( new Mailchimp_Block(), 'render' ),
			)
		);
	}

	private function register_countdown(): void {
		$path = WOLF_BLOCKS_DIR . '/build/blocks/countdown';
		if ( ! file_exists( $path . '/block.json' ) ) {
			return;
		}
		register_block_type(
			$path,
			array(
				'render_callback' => array( new Countdown_Block(), 'render' ),
			)
		);
	}
}
