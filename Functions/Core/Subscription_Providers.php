<?php
/**
 * Registry of available subscription providers.
 *
 * Single place that knows which ESPs exist. Add a provider here and it becomes
 * available to the REST route, the settings page, and the blocks at once.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

class Subscription_Providers {

	/**
	 * All registered providers, keyed by slug.
	 *
	 * @return array<string,Subscription_Provider>
	 */
	public static function all(): array {
		static $providers = null;

		if ( null === $providers ) {
			$providers = array();
			foreach ( array( new Mailchimp_Provider(), new Brevo_Provider() ) as $provider ) {
				$providers[ $provider->slug() ] = $provider;
			}
		}

		return $providers;
	}

	/** Resolve a provider by slug, or null when unknown. */
	public static function get( string $slug ): ?Subscription_Provider {
		return self::all()[ $slug ] ?? null;
	}
}
