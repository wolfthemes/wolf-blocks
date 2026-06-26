<?php
/**
 * REST endpoint for newsletter subscription (Brevo).
 *
 * POST /wp-json/wolf-blocks/v1/subscribe
 * Body: { "list_id": "…", "email": "…", "name": "…" (optional) }
 * Header: X-WP-Nonce: <wp_rest nonce>
 *
 * The API key is never sent from the client — it is retrieved from wp_options
 * where Mailchimp_Block::get_api_key() reads it server-side. As of the Brevo
 * switch (2026-06) the stored key is a Brevo API key and `list_id` is a Brevo
 * numeric list ID. Class/option names are kept for backward compatibility; an
 * ESP-neutral rename is a separate post-launch cleanup.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.0.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Mailchimp_Rest {

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
					'list_id' => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'email'   => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_email',
						'validate_callback' => function ( $value ) {
							return is_email( $value );
						},
					),
					'name'    => array(
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
		$list_id = $request->get_param( 'list_id' );
		$email   = $request->get_param( 'email' );
		$name    = $request->get_param( 'name' ) ?? '';

		$api_key = Mailchimp_Block::get_api_key();

		if ( ! $api_key ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'This form is not yet configured. Please contact the site administrator.', 'wolf-blocks' ),
				),
				503
			);
		}

		// Brevo list IDs are numeric; the block stores the attribute as a string.
		$brevo_list_id = (int) $list_id;
		if ( $brevo_list_id <= 0 ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Invalid list configuration.', 'wolf-blocks' ),
				),
				400
			);
		}

		$attributes = array();
		if ( $name ) {
			// Split on first space for FIRSTNAME / LASTNAME if possible.
			$parts                     = explode( ' ', $name, 2 );
			$attributes['FIRSTNAME']   = $parts[0];
			if ( isset( $parts[1] ) ) {
				$attributes['LASTNAME'] = $parts[1];
			}
		}

		$body = array(
			'email'         => $email,
			'listIds'       => array( $brevo_list_id ),
			// Idempotent: re-submitting an existing contact updates it (HTTP 204)
			// instead of erroring, so repeat sign-ups are not surfaced as failures.
			'updateEnabled' => true,
		);

		if ( ! empty( $attributes ) ) {
			$body['attributes'] = $attributes;
		}

		$response = wp_remote_post(
			'https://api.brevo.com/v3/contacts',
			array(
				'headers' => array(
					'api-key'      => $api_key,
					'accept'       => 'application/json',
					'Content-Type' => 'application/json',
				),
				'body'    => wp_json_encode( $body ),
				'timeout' => 10, // phpcs:ignore WordPressVIPMinimum.Performance.RemoteRequestTimeout.timeout_timeout
			)
		);

		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Could not reach the newsletter service. Please try again later.', 'wolf-blocks' ),
				),
				502
			);
		}

		$status = wp_remote_retrieve_response_code( $response );

		// 201 = contact created, 204 = existing contact updated (updateEnabled).
		if ( 201 === $status || 204 === $status ) {
			return new \WP_REST_Response( array( 'success' => true ), 200 );
		}

		// Surface a meaningful error without leaking internal details.
		// Brevo returns { "code": "...", "message": "..." } on failure.
		$data        = json_decode( wp_remote_retrieve_body( $response ), true );
		$brevo_code  = is_array( $data ) ? ( $data['code'] ?? '' ) : '';

		if ( 'invalid_parameter' === $brevo_code ) {
			$message = __( 'Please enter a valid email address.', 'wolf-blocks' );
		} else {
			$message = __( 'Subscription failed. Please try again.', 'wolf-blocks' );
		}

		return new \WP_REST_Response(
			array(
				'success' => false,
				'message' => $message,
			),
			400
		);
	}
}
