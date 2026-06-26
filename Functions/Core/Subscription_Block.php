<?php
/**
 * Newsletter subscription block — shared dynamic render callback.
 *
 * One render for every provider. Block_Loader binds an instance per provider
 * (Mailchimp, Brevo) as each block's render_callback, so the markup, classes,
 * and styling are identical; only the emitted `data-provider` differs. The
 * frontend (view.js) reads that attribute and POSTs it to the REST route.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Subscription_Block {

	private Subscription_Provider $provider;

	public function __construct( Subscription_Provider $provider ) {
		$this->provider = $provider;
	}

	public function render( array $attributes, string $content ): string { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed, VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		$list_id = trim( $attributes['listId'] ?? '' );

		if ( ! $this->provider->is_configured() || '' === $list_id ) {
			return '';
		}

		$show_name             = ! empty( $attributes['showName'] );
		$button_label          = sanitize_text_field( $attributes['buttonLabel'] ?? __( 'Subscribe', 'wolf-blocks' ) );
		$name_placeholder      = sanitize_text_field( $attributes['namePlaceholder'] ?? __( 'Your name', 'wolf-blocks' ) );
		$email_placeholder     = sanitize_text_field( $attributes['emailPlaceholder'] ?? __( 'Your email', 'wolf-blocks' ) );
		$empty_email_message   = sanitize_text_field( $attributes['emptyEmailMessage'] ?? __( 'Please enter your email address.', 'wolf-blocks' ) );
		$invalid_email_message = sanitize_text_field( $attributes['invalidEmailMessage'] ?? __( 'Please enter a valid email address.', 'wolf-blocks' ) );
		$empty_name_message    = sanitize_text_field( $attributes['emptyNameMessage'] ?? __( 'Please enter your name.', 'wolf-blocks' ) );
		$success_message       = sanitize_text_field( $attributes['successMessage'] ?? __( 'Thanks for subscribing!', 'wolf-blocks' ) );
		$error_message         = sanitize_text_field( $attributes['errorMessage'] ?? __( 'Something went wrong. Please try again.', 'wolf-blocks' ) );

		$uid      = wp_unique_id( 'wbsf-' );
		$rest_url = esc_url( rest_url( 'wolf-blocks/v1/subscribe' ) );
		$nonce    = wp_create_nonce( 'wp_rest' );

		$wrapper_attrs = get_block_wrapper_attributes(
			array(
				'class'                => 'wolf-blocks-subscribe-form',
				'data-provider'        => esc_attr( $this->provider->slug() ),
				'data-list-id'         => esc_attr( $list_id ),
				'data-nonce'           => esc_attr( $nonce ),
				'data-rest-url'        => $rest_url,
				'data-empty-email'     => esc_attr( $empty_email_message ),
				'data-invalid-email'   => esc_attr( $invalid_email_message ),
				'data-empty-name'      => esc_attr( $empty_name_message ),
				'data-success-message' => esc_attr( $success_message ),
				'data-error-message'   => esc_attr( $error_message ),
			)
		);

		ob_start();
		?>
		<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
			<form class="wolf-blocks-subscribe-form__form" novalidate>
				<?php if ( $show_name ) : ?>
				<div class="wolf-blocks-subscribe-form__field">
					<label for="<?php echo esc_attr( $uid ); ?>-name" class="screen-reader-text">
						<?php esc_html_e( 'Name', 'wolf-blocks' ); ?>
					</label>
					<input
						type="text"
						id="<?php echo esc_attr( $uid ); ?>-name"
						name="wolf_name"
						placeholder="<?php echo esc_attr( $name_placeholder ); ?>"
						autocomplete="given-name"
					>
				</div>
				<?php endif; ?>
				<div class="wolf-blocks-subscribe-form__field">
					<label for="<?php echo esc_attr( $uid ); ?>-email" class="screen-reader-text">
						<?php esc_html_e( 'Email address', 'wolf-blocks' ); ?>
					</label>
					<input
						type="email"
						id="<?php echo esc_attr( $uid ); ?>-email"
						name="wolf_email"
						placeholder="<?php echo esc_attr( $email_placeholder ); ?>"
						autocomplete="email"
						required
					>
				</div>
				<div class="wolf-blocks-subscribe-form__action">
					<button type="submit" class="wp-element-button"><?php echo esc_html( $button_label ); ?></button>
				</div>
				<div class="wolf-blocks-subscribe-form__message" aria-live="polite" hidden></div>
			</form>
		</div>
		<?php
		return ob_get_clean();
	}
}
