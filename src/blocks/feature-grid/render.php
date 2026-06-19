<?php
/**
 * Render callback for wolf-blocks/feature-grid.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner blocks HTML.
 */

$columns = isset( $attributes['columns'] ) ? (int) $attributes['columns'] : 4;
$classes = implode( ' ', array(
	'wolf-blocks-feature-grid',
	'wolf-blocks-feature-grid--cols-' . $columns,
) );
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => $classes ) ); ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
