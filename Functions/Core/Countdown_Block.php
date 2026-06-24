<?php
/**
 * Countdown Block — dynamic render_callback.
 *
 * When source is "manual" the PHP renders the HTML directly from the
 * block attributes.  When source is "wolf-store-offer" it reads the
 * active offer via Wolf_Store\Admin\Options::get_active_offer() — if
 * wolf-store is not installed or no offer is configured, it returns an
 * empty string so the block silently disappears on the frontend.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Countdown_Block {

	/**
	 * Render callback called by register_block_type().
	 *
	 * @param array    $attributes Block attributes.
	 * @param string   $content    Inner-block HTML (unused).
	 * @param \WP_Block $block     Block instance (unused).
	 * @return string Rendered HTML or empty string.
	 */
	public function render( array $attributes, string $content, \WP_Block $block ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed,VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		$source       = sanitize_key( $attributes['source'] ?? 'manual' );
		$expired_text = sanitize_text_field( $attributes['expiredText'] ?? 'Offer has ended' );
		$show_days    = (bool) ( $attributes['showDays'] ?? true );
		$show_seconds = (bool) ( $attributes['showSeconds'] ?? true );

		if ( 'wolf-store-offer' === $source ) {
			if ( ! class_exists( 'Wolf_Store\\Admin\\Options' ) ) {
				return '';
			}
			$offer = \Wolf_Store\Admin\Options::get_active_offer();
			if ( empty( $offer ) || empty( $offer['expiry'] ) ) {
				return '';
			}
			$target_date = $offer['expiry'];
		} else {
			$target_date = sanitize_text_field( $attributes['targetDate'] ?? '' );
		}

		if ( ! $target_date ) {
			return '';
		}

		$wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class'              => 'wolf-blocks-countdown is-loading',
				'data-target'        => esc_attr( $target_date ),
				'data-expired-text'  => esc_attr( $expired_text ),
				'data-show-days'     => $show_days ? 'true' : 'false',
				'data-show-seconds'  => $show_seconds ? 'true' : 'false',
			)
		);

		ob_start();
		?>
		<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() is a trusted WP core function. ?> >
			<div class="wolf-blocks-countdown__units">
				<?php if ( $show_days ) : ?>
				<div class="wolf-blocks-countdown__unit" data-unit="days">
					<strong>00</strong><small><?php esc_html_e( 'days', 'wolf-blocks' ); ?></small>
				</div>
				<?php endif; ?>
				<div class="wolf-blocks-countdown__unit" data-unit="hours">
					<strong>00</strong><small><?php esc_html_e( 'hrs', 'wolf-blocks' ); ?></small>
				</div>
				<div class="wolf-blocks-countdown__unit" data-unit="minutes">
					<strong>00</strong><small><?php esc_html_e( 'min', 'wolf-blocks' ); ?></small>
				</div>
				<?php if ( $show_seconds ) : ?>
				<div class="wolf-blocks-countdown__unit" data-unit="seconds">
					<strong>00</strong><small><?php esc_html_e( 'sec', 'wolf-blocks' ); ?></small>
				</div>
				<?php endif; ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}
}
