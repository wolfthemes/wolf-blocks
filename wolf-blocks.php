<?php
/**
 * Plugin Name:  Wolf Blocks
 * Plugin URI:   https://wolfthemes.com
 * Description:  Reusable Gutenberg blocks for WolfThemes projects. Consumes CSS custom properties from the active theme.
 * Version:      1.0.0
 * Author:       Constantin Saguin
 * Author URI:   https://wolfthemes.com
 * Text Domain:  wolf-blocks
 * Domain Path:  /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 *
 * @package WolfBlocks
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/autoload.php';

register_activation_hook( __FILE__, function () {
	flush_rewrite_rules(); // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.flush_rewrite_rules_flush_rewrite_rules
} );

add_action( 'plugins_loaded', function () {
	Wolf_Blocks\Core\Plugin::get_instance();
} );
