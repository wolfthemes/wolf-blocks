<?php
/**
 * Shared behaviour for subscription providers.
 *
 * Holds the bits every ESP needs the same way — reading the stored API key,
 * the configured check, and splitting a single name field into first/last —
 * so each concrete provider only implements its own HTTP call.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

abstract class Abstract_Subscription_Provider implements Subscription_Provider {

	public function get_api_key(): string {
		return (string) get_option( $this->api_key_option(), '' );
	}

	public function is_configured(): bool {
		return '' !== $this->get_api_key();
	}

	/**
	 * Splits a full name into [ first, last ] on the first space.
	 *
	 * @return array{0:string,1:string}
	 */
	protected function split_name( string $name ): array {
		$name = trim( $name );
		if ( '' === $name ) {
			return array( '', '' );
		}
		$parts = explode( ' ', $name, 2 );
		return array( $parts[0], $parts[1] ?? '' );
	}

	/** Convenience: a failure result with the given HTTP status and message. */
	protected function fail( int $status, string $message ): array {
		return array(
			'success' => false,
			'status'  => $status,
			'message' => $message,
		);
	}

	/** Convenience: a success result. */
	protected function ok(): array {
		return array(
			'success' => true,
			'status'  => 200,
			'message' => '',
		);
	}
}
