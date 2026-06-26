<?php
/**
 * Brevo subscription provider.
 *
 * Upserts a contact into a Brevo list via POST /v3/contacts. Auth is the
 * `api-key` header; `updateEnabled` makes re-submits idempotent (existing
 * contacts return 204 instead of an error).
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Brevo_Provider extends Abstract_Subscription_Provider {

	const SLUG           = 'brevo';
	const API_KEY_OPTION = 'wolf_blocks_brevo_api_key';

	public function slug(): string {
		return self::SLUG;
	}

	public function api_key_option(): string {
		return self::API_KEY_OPTION;
	}

	public function subscribe( string $list_id, string $email, string $name ): array {
		$api_key = $this->get_api_key();

		// Brevo list IDs are numeric; the block stores the attribute as a string.
		$brevo_list_id = (int) $list_id;
		if ( $brevo_list_id <= 0 ) {
			return $this->fail( 400, __( 'Invalid list configuration.', 'wolf-blocks' ) );
		}

		list( $first, $last ) = $this->split_name( $name );

		$attributes = array();
		if ( '' !== $first ) {
			$attributes['FIRSTNAME'] = $first;
		}
		if ( '' !== $last ) {
			$attributes['LASTNAME'] = $last;
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
			return $this->fail( 502, __( 'Could not reach the newsletter service. Please try again later.', 'wolf-blocks' ) );
		}

		$status = wp_remote_retrieve_response_code( $response );

		// 201 = contact created, 204 = existing contact updated (updateEnabled).
		if ( 201 === $status || 204 === $status ) {
			return $this->ok();
		}

		// Brevo returns { "code": "...", "message": "..." } on failure.
		$data = json_decode( wp_remote_retrieve_body( $response ), true );
		$code = is_array( $data ) ? ( $data['code'] ?? '' ) : '';

		if ( 'invalid_parameter' === $code ) {
			$message = __( 'Please enter a valid email address.', 'wolf-blocks' );
		} else {
			$message = __( 'Subscription failed. Please try again.', 'wolf-blocks' );
		}

		return $this->fail( 400, $message );
	}
}
