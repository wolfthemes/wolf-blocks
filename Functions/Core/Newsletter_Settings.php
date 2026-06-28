<?php
/**
 * WP Admin settings page for Wolf Blocks newsletter providers.
 *
 * Accessible at Settings → Newsletter Settings. Holds one API-key field per
 * provider (Mailchimp, Brevo). Keys are stored in wp_options and never exposed
 * to the frontend or to non-admin users; the REST API exposes only a boolean
 * per provider (e.g. wolf_blocks_brevo_api_key_set) so the block editor can
 * show a configuration notice without leaking the key.
 *
 * Each key field submits empty by design (the saved value is never echoed back
 * into the input), so the sanitize callback keeps the existing value when the
 * field is left blank — otherwise saving the page to set one provider's key
 * would wipe the other's.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Newsletter_Settings {

	const PAGE_SLUG = 'wolf-blocks-newsletter';
	const GROUP     = 'wolf_blocks_newsletter';
	const SECTION   = 'wolf_blocks_newsletter_section';

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'rest_api_init', array( $this, 'expose_key_status' ) );
	}

	public function add_settings_page(): void {
		add_options_page(
			__( 'Wolf Blocks — Newsletter', 'wolf-blocks' ),
			__( 'Newsletter Settings', 'wolf-blocks' ),
			'manage_options',
			self::PAGE_SLUG,
			array( $this, 'render_page' )
		);
	}

	public function register_settings(): void {
		add_settings_section(
			self::SECTION,
			__( 'Provider API Keys', 'wolf-blocks' ),
			array( $this, 'render_section_intro' ),
			self::PAGE_SLUG
		);

		$this->register_key_field(
			Mailchimp_Provider::API_KEY_OPTION,
			__( 'Mailchimp API Key', 'wolf-blocks' ),
			sprintf(
				/* translators: %s: link to Mailchimp API keys page */
				esc_html__( 'Find your API key in %s. Set the form\'s Audience ID on the Mailchimp Form block.', 'wolf-blocks' ),
				'<a href="https://mailchimp.com/help/about-api-keys/" target="_blank" rel="noopener noreferrer">Mailchimp &rarr; Account &rarr; Extras &rarr; API keys</a>'
			)
		);

		$this->register_key_field(
			Brevo_Provider::API_KEY_OPTION,
			__( 'Brevo API Key', 'wolf-blocks' ),
			sprintf(
				/* translators: %s: link to Brevo API keys page */
				esc_html__( 'Find your API key in %s. Set the form\'s numeric list ID on the Brevo Form block.', 'wolf-blocks' ),
				'<a href="https://app.brevo.com/settings/keys/api" target="_blank" rel="noopener noreferrer">Brevo &rarr; Settings &rarr; SMTP &amp; API &rarr; API Keys</a>'
			)
		);
	}

	/**
	 * Registers one API-key setting + field for a provider.
	 *
	 * @param string $option Option name in wp_options.
	 * @param string $label  Field label.
	 * @param string $help   Help HTML (already escaped).
	 */
	private function register_key_field( string $option, string $label, string $help ): void {
		register_setting(
			self::GROUP,
			$option,
			array(
				'type'              => 'string',
				'sanitize_callback' => function ( $value ) use ( $option ) {
					$value = sanitize_text_field( $value );
					// Blank submit = "leave unchanged" (the field never echoes the
					// saved key), so preserve the stored value instead of wiping it.
					if ( '' === $value ) {
						return (string) get_option( $option, '' );
					}
					return $value;
				},
				'default'           => '',
			)
		);

		add_settings_field(
			$option,
			$label,
			array( $this, 'render_api_key_field' ),
			self::PAGE_SLUG,
			self::SECTION,
			array(
				'option' => $option,
				'help'   => $help,
			)
		);
	}

	public function render_section_intro(): void {
		echo '<p>' . esc_html__( 'Add an API key for each newsletter service you use. Leave a field blank to keep its current key unchanged.', 'wolf-blocks' ) . '</p>';
	}

	/**
	 * Render the API key input field for a newsletter provider.
	 *
	 * @param array{option:string,help:string} $args Field arguments.
	 */
	public function render_api_key_field( array $args ): void {
		$option = $args['option'];
		$value  = get_option( $option, '' );
		// Show a masked placeholder when a key is already saved.
		$placeholder = $value ? str_repeat( '*', 36 ) : '';
		?>
		<input
			type="password"
			id="<?php echo esc_attr( $option ); ?>"
			name="<?php echo esc_attr( $option ); ?>"
			value=""
			placeholder="<?php echo esc_attr( $placeholder ); ?>"
			autocomplete="new-password"
			class="regular-text"
		>
		<p class="description"><?php echo wp_kses_post( $args['help'] ); ?></p>
		<?php if ( $value ) : ?>
		<p class="description" style="color:#2e7d32;">
			&#10003; <?php esc_html_e( 'An API key is currently saved.', 'wolf-blocks' ); ?>
		</p>
		<?php endif; ?>
		<?php
	}

	public function render_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'Newsletter Settings', 'wolf-blocks' ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( self::GROUP );
				do_settings_sections( self::PAGE_SLUG );
				submit_button( __( 'Save API Keys', 'wolf-blocks' ) );
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Exposes a per-provider boolean to the REST API so the block editor can
	 * show a configuration notice without any key leaving the server.
	 */
	public function expose_key_status(): void {
		$flags = array(
			Mailchimp_Provider::API_KEY_OPTION => 'wolf_blocks_mailchimp_api_key_set',
			Brevo_Provider::API_KEY_OPTION     => 'wolf_blocks_brevo_api_key_set',
		);

		foreach ( $flags as $option => $field ) {
			register_rest_field(
				'root', // attaches to the /wp-json/ site endpoint (wp/v2/settings)
				$field,
				array(
					'get_callback' => function () use ( $option ) {
						return '' !== get_option( $option, '' );
					},
					'schema'       => array(
						'type'        => 'boolean',
						'description' => 'Whether this provider API key has been configured in Wolf Blocks settings.',
						'context'     => array( 'edit' ),
					),
				)
			);
		}
	}
}
