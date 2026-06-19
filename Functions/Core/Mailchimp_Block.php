<?php
/**
 * Mailchimp Form block — dynamic render callback.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Mailchimp_Block {

	/**
	 * wp_options key prefix used to stash the API key server-side.
	 * Never exposed in frontend HTML.
	 */
	const OPTION_PREFIX = '_wolf_blocks_mc_key_';

	public function render( array $attributes, string $content ): string {
		$api_key = trim( $attributes['apiKey'] ?? '' );
		$list_id = trim( $attributes['listId'] ?? '' );

		if ( ! $api_key || ! $list_id ) {
			return '';
		}

		// Stash the API key server-side, keyed by a hash of the list ID.
		// The REST endpoint retrieves it without ever exposing it to the client.
		update_option( self::OPTION_PREFIX . md5( $list_id ), $api_key, false );

		$show_name        = ! empty( $attributes['showName'] );
		$button_label     = sanitize_text_field( $attributes['buttonLabel'] ?? __( 'Subscribe', 'wolf-blocks' ) );
		$name_placeholder = sanitize_text_field( $attributes['namePlaceholder'] ?? __( 'Your name', 'wolf-blocks' ) );
		$email_placeholder = sanitize_text_field( $attributes['emailPlaceholder'] ?? __( 'Your email', 'wolf-blocks' ) );
		$success_message  = sanitize_text_field( $attributes['successMessage'] ?? __( 'Thanks for subscribing!', 'wolf-blocks' ) );
		$error_message    = sanitize_text_field( $attributes['errorMessage'] ?? __( 'Something went wrong. Please try again.', 'wolf-blocks' ) );

		$uid       = wp_unique_id( 'mcf-' );
		$rest_url  = esc_url( rest_url( 'wolf-blocks/v1/subscribe' ) );
		$nonce     = wp_create_nonce( 'wp_rest' );

		$wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class'                => 'wolf-blocks-mailchimp-form',
				'data-list-id'         => esc_attr( $list_id ),
				'data-nonce'           => esc_attr( $nonce ),
				'data-rest-url'        => $rest_url,
				'data-success-message' => esc_attr( $success_message ),
				'data-error-message'   => esc_attr( $error_message ),
			)
		);

		ob_start();
		?>
		<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<form class="wolf-blocks-mailchimp-form__form" novalidate>
				<?php if ( $show_name ) : ?>
				<div class="wolf-blocks-mailchimp-form__field">
					<label for="<?php echo esc_attr( $uid ); ?>-name" class="screen-reader-text">
						<?php esc_html_e( 'Name', 'wolf-blocks' ); ?>
					</label>
					<input
						type="text"
						id="<?php echo esc_attr( $uid ); ?>-name"
						name="mc_name"
						placeholder="<?php echo esc_attr( $name_placeholder ); ?>"
						autocomplete="given-name"
					>
				</div>
				<?php endif; ?>
				<div class="wolf-blocks-mailchimp-form__field">
					<label for="<?php echo esc_attr( $uid ); ?>-email" class="screen-reader-text">
						<?php esc_html_e( 'Email address', 'wolf-blocks' ); ?>
					</label>
					<input
						type="email"
						id="<?php echo esc_attr( $uid ); ?>-email"
						name="mc_email"
						placeholder="<?php echo esc_attr( $email_placeholder ); ?>"
						autocomplete="email"
						required
					>
				</div>
				<div class="wolf-blocks-mailchimp-form__action">
					<button type="submit"><?php echo esc_html( $button_label ); ?></button>
				</div>
				<div class="wolf-blocks-mailchimp-form__message" aria-live="polite" hidden></div>
			</form>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Retrieves the stored API key for a given list ID.
	 *
	 * @param string $list_id The Mailchimp audience list ID.
	 * @return string The API key, or empty string if not found.
	 */
	public static function get_api_key( string $list_id ): string {
		return (string) get_option( self::OPTION_PREFIX . md5( $list_id ), '' );
	}
}
