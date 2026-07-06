<?php
/**
 * Block Loader — discovers and registers all blocks from the build directory.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

use Wolf_Blocks\Blocks\Countdown_Block;
use Wolf_Blocks\Blocks\Subscription_Block;
use Wolf_Blocks\Newsletter\Subscription_Providers;

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

		$this->register_subscription_forms();

		foreach ( $blocks as $block ) {
			$path = WOLF_BLOCKS_DIR . '/build/blocks/' . $block;
			if ( file_exists( $path . '/block.json' ) ) {
				register_block_type( $path );
			}
		}

		$this->register_countdown();
	}

	/**
	 * Registers one subscription block per provider, each bound to its own
	 * provider-aware render callback. The block folder name matches the
	 * provider slug (mailchimp-form, brevo-form).
	 */
	private function register_subscription_forms(): void {
		foreach ( Subscription_Providers::all() as $provider ) {
			$path = WOLF_BLOCKS_DIR . '/build/blocks/' . $provider->slug() . '-form';
			if ( ! file_exists( $path . '/block.json' ) ) {
				continue;
			}
			register_block_type(
				$path,
				array(
					'render_callback' => array( new Subscription_Block( $provider ), 'render' ),
				)
			);
		}
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
