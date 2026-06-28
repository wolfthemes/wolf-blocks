<?php
/**
 * Subscription provider contract.
 *
 * A provider knows how to push an email address to a single list/audience of
 * one email service (Mailchimp, Brevo, …). The REST endpoint and the block
 * render are provider-agnostic and talk only to this interface, so adding a
 * new ESP means adding one class — not touching the route, settings, or blocks.
 *
 * @package WolfBlocks
 * @subpackage Core
 * @since 1.1.0
 */

namespace Wolf_Blocks\Core;

defined( 'ABSPATH' ) || exit;

interface Subscription_Provider {

	/**
	 * Machine slug, e.g. "mailchimp" or "brevo". Used as the block's provider
	 * marker and the REST `provider` parameter.
	 */
	public function slug(): string;

	/** WP options key under which this provider's API key is stored. */
	public function api_key_option(): string;

	/** The stored API key, or an empty string when unset. */
	public function get_api_key(): string;

	/** Whether an API key has been configured for this provider. */
	public function is_configured(): bool;

	/**
	 * Subscribe an email to a list/audience.
	 *
	 * @param string $list_id Provider-specific list/audience identifier.
	 * @param string $email   Sanitized, validated email address.
	 * @param string $name    Optional full name ("" when not collected).
	 * @return array{success:bool,status:int,message:string} Result; `status`
	 *               is the HTTP code the REST endpoint should return, `message`
	 *               is a user-facing string (empty on success).
	 */
	public function subscribe( string $list_id, string $email, string $name ): array;
}
