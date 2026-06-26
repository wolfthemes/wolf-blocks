<?php
/**
 * Mailchimp subscription provider.
 *
 * Upserts a member into a Mailchimp audience via the Marketing API. The
 * datacenter is derived from the API key suffix; the request uses HTTP Basic
 * auth (`anystring:<key>`).
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Mailchimp_Provider extends Abstract_Subscription_Provider {

	const SLUG           = 'mailchimp';
	const API_KEY_OPTION = 'wolf_blocks_mailchimp_api_key';

	public function slug(): string {
		return self::SLUG;
	}

	public function api_key_option(): string {
		return self::API_KEY_OPTION;
	}

	public function subscribe( string $list_id, string $email, string $name ): array {
		$api_key = $this->get_api_key();

		// Mailchimp datacenter is the suffix after the last hyphen in the API key.
		$dc = substr( $api_key, strrpos( $api_key, '-' ) + 1 );
		if ( ! $dc ) {
			return $this->fail( 400, __( 'Invalid API key format.', 'wolf-blocks' ) );
		}

		$subscriber_hash = md5( strtolower( $email ) );
		$endpoint        = "https://{$dc}.api.mailchimp.com/3.0/lists/{$list_id}/members/{$subscriber_hash}";

		list( $first, $last ) = $this->split_name( $name );

		$merge_fields = array();
		if ( '' !== $first ) {
			$merge_fields['FNAME'] = $first;
		}
		if ( '' !== $last ) {
			$merge_fields['LNAME'] = $last;
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
				'timeout' => 10, // phpcs:ignore WordPressVIPMinimum.Performance.RemoteRequestTimeout.timeout_timeout
			)
		);

		if ( is_wp_error( $response ) ) {
			return $this->fail( 502, __( 'Could not reach the newsletter service. Please try again later.', 'wolf-blocks' ) );
		}

		// 200 = created or updated (PUT upsert).
		if ( 200 === wp_remote_retrieve_response_code( $response ) ) {
			return $this->ok();
		}

		// Surface a meaningful error without leaking internal details.
		$data   = json_decode( wp_remote_retrieve_body( $response ), true );
		$title  = is_array( $data ) ? strtolower( $data['title'] ?? '' ) : '';
		$detail = is_array( $data ) ? strtolower( $data['detail'] ?? '' ) : '';

		if ( str_contains( $title, 'fake' ) || str_contains( $detail, 'fake' ) ) {
			$message = __( 'Please enter a valid email address.', 'wolf-blocks' );
		} elseif ( str_contains( $title, 'compliance' ) ) {
			$message = __( 'This email address cannot be subscribed at this time.', 'wolf-blocks' );
		} else {
			$message = __( 'Subscription failed. Please try again.', 'wolf-blocks' );
		}

		return $this->fail( 400, $message );
	}
}
