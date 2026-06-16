<?php
// Autoloader for Wolf_Blocks
spl_autoload_register( function ( $class ) {
	$prefix   = 'Wolf_Blocks\\';
	$base_dir = __DIR__ . '/Functions/';

	if ( strncmp( $prefix, $class, strlen( $prefix ) ) !== 0 ) {
		return;
	}

	$relative = substr( $class, strlen( $prefix ) );
	$file     = $base_dir . str_replace( '\\', '/', $relative ) . '.php';

	if ( file_exists( $file ) ) {
		require $file; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	}
} );
