<?php
/**
 * REST endpoint for Mailchimp subscription.
 *
 * POST /wp-json/wolf-blocks/v1/subscribe
 * Body: { "list_id": "…", "email": "…", "name": "…" (optional) }
 * Header: X-WP-Nonce: <wp_rest nonce>
 *
 * The API key is never sent from the client — it is retrieved from wp_options
 * where Mailchimp_Block::render() stored it at page-render time.
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

		$api_key = Mailchimp_Block::get_api_key( $list_id );

		if ( ! $api_key ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'This form is not yet configured. Please contact the site administrator.', 'wolf-blocks' ),
				),
				503
			);
		}

		// Mailchimp datacenter is the suffix after the last hyphen in the API key.
		$dc = substr( $api_key, strrpos( $api_key, '-' ) + 1 );
		if ( ! $dc ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Invalid API key format.', 'wolf-blocks' ),
				),
				400
			);
		}

		$subscriber_hash = md5( strtolower( $email ) );
		$endpoint        = "https://{$dc}.api.mailchimp.com/3.0/lists/{$list_id}/members/{$subscriber_hash}";

		$merge_fields = array();
		if ( $name ) {
			// Split on first space for FNAME / LNAME if possible.
			$parts              = explode( ' ', $name, 2 );
			$merge_fields['FNAME'] = $parts[0];
			if ( isset( $parts[1] ) ) {
				$merge_fields['LNAME'] = $parts[1];
			}
		}

		$body = array(
			'email_address' => $email,
			'status_if_new' => 'subscribed',
			'status'        => 'subscribed',
		);

		if ( ! empty( $merge_fields ) ) {
			$body['merge_fields'] = $merge_fields;
		}

		$response = wp_remote_request(
			$endpoint,
			array(
				'method'  => 'PUT',
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'anystring:' . $api_key ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
					'Content-Type'  => 'application/json',
				),
				'body'    => wp_json_encode( $body ),
				'timeout' => 15,
			)
		);

		if ( is_wp_error( $response ) ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Could not reach Mailchimp. Please try again later.', 'wolf-blocks' ),
				),
				502
			);
		}

		$status = wp_remote_retrieve_response_code( $response );
		$data   = json_decode( wp_remote_retrieve_body( $response ), true );

		// 200 = updated existing member, 400 with "Member Exists" is also handled by PUT.
		if ( $status === 200 ) {
			return new \WP_REST_Response( array( 'success' => true ), 200 );
		}

		// Surface a meaningful error without leaking internal details.
		$mc_title  = $data['title'] ?? '';
		$mc_detail = $data['detail'] ?? '';

		if ( str_contains( strtolower( $mc_title ), 'fake' ) || str_contains( strtolower( $mc_detail ), 'fake' ) ) {
			$message = __( 'Please enter a valid email address.', 'wolf-blocks' );
		} elseif ( str_contains( strtolower( $mc_title ), 'compliance' ) ) {
			$message = __( 'This email address cannot be subscribed at this time.', 'wolf-blocks' );
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
