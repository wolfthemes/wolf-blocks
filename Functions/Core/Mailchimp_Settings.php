<?php
/**
 * WP Admin settings page for Wolf Blocks — Mailchimp API key.
 *
 * Accessible at Settings → Wolf Blocks → Mailchimp.
 * The key is stored in wp_options and never exposed to the frontend or
 * to non-admin users. The REST API exposes only a boolean
 * (wolf_blocks_mailchimp_api_key_set) so the block editor can show a
 * configuration notice without leaking the key.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Mailchimp_Settings {

	const OPTION_NAME = 'wolf_blocks_mailchimp_api_key';
	const PAGE_SLUG   = 'wolf-blocks-mailchimp';

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
		add_action( 'rest_api_init', array( $this, 'expose_key_status' ) );
	}

	public function add_settings_page(): void {
		add_options_page(
			__( 'Wolf Blocks — Mailchimp', 'wolf-blocks' ),
			__( 'Wolf Blocks — Mailchimp', 'wolf-blocks' ),
			'manage_options',
			self::PAGE_SLUG,
			array( $this, 'render_page' )
		);
	}

	public function register_settings(): void {
		register_setting(
			self::PAGE_SLUG,
			self::OPTION_NAME,
			array(
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => '',
			)
		);

		add_settings_section(
			'wolf_blocks_mailchimp_section',
			__( 'Mailchimp API', 'wolf-blocks' ),
			'__return_false',
			self::PAGE_SLUG
		);

		add_settings_field(
			self::OPTION_NAME,
			__( 'API Key', 'wolf-blocks' ),
			array( $this, 'render_api_key_field' ),
			self::PAGE_SLUG,
			'wolf_blocks_mailchimp_section'
		);
	}

	public function render_api_key_field(): void {
		$value = get_option( self::OPTION_NAME, '' );
		// Show a masked placeholder when a key is already saved.
		$placeholder = $value ? str_repeat( '*', 36 ) : '';
		?>
		<input
			type="password"
			id="<?php echo esc_attr( self::OPTION_NAME ); ?>"
			name="<?php echo esc_attr( self::OPTION_NAME ); ?>"
			value=""
			placeholder="<?php echo esc_attr( $placeholder ); ?>"
			autocomplete="new-password"
			class="regular-text"
		>
		<p class="description">
			<?php
			printf(
				/* translators: %s: link to Mailchimp API keys page */
				esc_html__( 'Find your API key in %s.', 'wolf-blocks' ),
				'<a href="https://mailchimp.com/help/about-api-keys/" target="_blank" rel="noopener noreferrer">Mailchimp → Account → Extras → API keys</a>'
			);
			?>
		</p>
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
			<h1><?php esc_html_e( 'Wolf Blocks — Mailchimp Settings', 'wolf-blocks' ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( self::PAGE_SLUG );
				do_settings_sections( self::PAGE_SLUG );
				submit_button( __( 'Save API Key', 'wolf-blocks' ) );
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Exposes a boolean to the REST API so the block editor can show a
	 * configuration notice without the key itself ever leaving the server.
	 */
	public function expose_key_status(): void {
		register_rest_field(
			'root',  // attaches to the /wp-json/ site endpoint (wp/v2/settings)
			'wolf_blocks_mailchimp_api_key_set',
			array(
				'get_callback' => function () {
					return '' !== get_option( self::OPTION_NAME, '' );
				},
				'schema'       => array(
					'type'        => 'boolean',
					'description' => 'Whether a Mailchimp API key has been configured in Wolf Blocks settings.',
					'context'     => array( 'edit' ),
				),
			)
		);
	}
}
