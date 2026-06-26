<?php
/**
 * REST endpoint for newsletter subscriptions.
 *
 * POST /wp-json/wolf-blocks/v1/subscribe
 * Body: { "provider": "mailchimp|brevo", "list_id": "…", "email": "…",
 *         "name": "…" (optional) }
 * Header: X-WP-Nonce: <wp_rest nonce>
 *
 * The route is provider-agnostic: it resolves the provider by slug and
 * delegates the actual API call. API keys live in wp_options and never reach
 * the client.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Subscription_Rest {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes(): void {
		register_rest_route(
			'wolf-blocks/v1',
			'/subscribe',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'subscribe' ),
				'permission_callback' => array( $this, 'check_nonce' ),
				'args'                => array(
					'provider' => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_key',
					),
					'list_id'  => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'email'    => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_email',
						'validate_callback' => function ( $value ) {
							return is_email( $value );
						},
					),
					'name'     => array(
						'required'          => false,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);
	}

	public function check_nonce( \WP_REST_Request $request ): bool {
		// WP REST API verifies X-WP-Nonce automatically for logged-in users.
		// For guests we verify the nonce manually — same token, same action.
		$nonce = $request->get_header( 'X-WP-Nonce' );
		return (bool) wp_verify_nonce( $nonce, 'wp_rest' );
	}

	public function subscribe( \WP_REST_Request $request ): \WP_REST_Response {
		$provider = Subscription_Providers::get( $request->get_param( 'provider' ) );

		if ( ! $provider ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Unknown subscription provider.', 'wolf-blocks' ),
				),
				400
			);
		}

		if ( ! $provider->is_configured() ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'This form is not yet configured. Please contact the site administrator.', 'wolf-blocks' ),
				),
				503
			);
		}

		$result = $provider->subscribe(
			$request->get_param( 'list_id' ),
			$request->get_param( 'email' ),
			$request->get_param( 'name' ) ?? ''
		);

		if ( $result['success'] ) {
			return new \WP_REST_Response( array( 'success' => true ), 200 );
		}

		return new \WP_REST_Response(
			array(
				'success' => false,
				'message' => $result['message'],
			),
			$result['status']
		);
	}
}
