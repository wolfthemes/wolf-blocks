<?php
/**
 * Render callback for wolf-blocks/feature-grid.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner blocks HTML.
 */

$wolf_blocks_columns = isset( $attributes['columns'] ) ? (int) $attributes['columns'] : 4;
$wolf_blocks_classes = implode( ' ', array(
	'wolf-blocks-feature-grid',
	'wolf-blocks-feature-grid--cols-' . $wolf_blocks_columns,
) );
?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes( array( 'class' => $wolf_blocks_classes ) ) ); ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
