<?php
/**
 * Render callback for wolf-blocks/feature-grid-item.
 *
 * @param array $attributes Block attributes.
 */

$icon      = isset( $attributes['icon'] ) ? $attributes['icon'] : 'starFilled';
$title     = isset( $attributes['title'] ) ? $attributes['title'] : '';
$desc      = isset( $attributes['description'] ) ? $attributes['description'] : '';

$icons = array(
	'starFilled' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"/></svg>',
	'shield'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 4 6v6c0 5.25 3.5 8.5 8 9 4.5-.5 8-3.75 8-9V6l-8-3zm6.5 9c0 4.25-2.75 6.75-6.5 7.5-3.75-.75-6.5-3.25-6.5-7.5V7l6.5-2.5L18.5 7v5z"/></svg>',
	'thumbsUp'   => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19.7 10.3c-.4-.5-1-.8-1.7-.8H14V7c0-1.7-1.3-3-3-3h-.5v1.4l-.5 4.6-2 3H5v7.5h12.2c.9 0 1.7-.6 1.9-1.5l1.4-5.6c.1-.5 0-1.1-.3-1.6l-.5-.5zM6.5 19.5h-1v-6h1v6zm12.1-7.3-1.4 5.6c-.1.3-.4.6-.8.6H7.5v-6.1l2.1-3.2.5-4.3c.7.2 1.2.8 1.2 1.5v4.2h5.2c.3 0 .6.1.8.4.2.2.3.5.2.8l-.9.5z"/></svg>',
	'lock'       => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17 10h-1.2V7c0-2.1-1.7-3.8-3.8-3.8-2.1 0-3.8 1.7-3.8 3.8v3H7c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1h10c.6 0 1-.4 1-1v-8c0-.6-.4-1-1-1zm-7.3-3c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3v3H9.7V7zm7.8 11.5H6.5v-7h11v7z"/></svg>',
	'plugins'    => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M10.5 3.5h3V7h3.25v3H13.5v10.5h-3V10H7V7h3.5V3.5z"/></svg>',
	'layout'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 5.5H6a.5.5 0 00-.5.5v3h13V6a.5.5 0 00-.5-.5zm.5 5H10v8h8a.5.5 0 00.5-.5v-7.5zm-10 0h-3V18a.5.5 0 00.5.5h2.5v-8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>',
	'color'      => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.8-1.3-1.5-1.8-2.1L12 4.2l-1.3 1.4c-.5.6-1.1 1.3-1.8 2.1-.8 1.1-1.6 2.2-2.1 3.2C6.3 12 6 13 6 13.9c0 3.3 2.7 6 6 6s6-2.7 6-6c0-.9-.3-1.9-.8-3zm-5.2 7.4c-2.5 0-4.5-2-4.5-4.5 0-.6.2-1.4.7-2.4.5-.9 1.2-1.9 2-3 .5-.6 1-1.3 1.8-2.1.8.8 1.3 1.5 1.8 2.1.8 1 1.5 2.1 2 3 .5 1 .7 1.8.7 2.4 0 2.5-2 4.5-4.5 4.5z"/></svg>',
	'tag'        => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.75 4a.75.75 0 0 0-.75.75v7.826c0 .2.08.39.22.53l6.72 6.716a2.313 2.313 0 0 0 3.276-.001l5.61-5.611-.531-.53.532.528a2.315 2.315 0 0 0 0-3.264L13.104 4.22a.75.75 0 0 0-.53-.22H4.75ZM19 12.576a.815.815 0 0 1-.236.574l-5.61 5.611a.814.814 0 0 1-1.153 0L5.5 12.264V5.5h6.763l6.5 6.502a.816.816 0 0 1 .237.574ZM8.75 9.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>',
	'people'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 12c1.7 0 3-1.3 3-3S10.7 6 9 6 6 7.3 6 9s1.3 3 3 3zm0-4.5c.8 0 1.5.7 1.5 1.5S9.8 10.5 9 10.5 7.5 9.8 7.5 9 8.2 7.5 9 7.5zm6.8 6.7c1-.8 1.7-2 1.7-3.2 0-2.2-1.8-4-4-4-.6 0-1.2.1-1.7.4.4.6.7 1.3.9 2 .3-.1.5-.2.8-.2 1.4 0 2.5 1.1 2.5 2.5 0 .9-.5 1.7-1.2 2.2l-.9.7h1.2c2 0 3.6 1 4.3 2.5H19c-.7-1.3-2-2.2-3.2-2.7l-.9-.7 .9.5-.9-.5h-.1zm-2.3.3H3c.7-1.5 2.3-2.5 4.5-2.5h3c2.2 0 3.8 1 4.5 2.5h-1.5zm-4.5 0z"/></svg>',
	'archive'    => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 3.5h14v2.6H5V3.5zm-.5 3.1h15v14h-15v-14zm7.5 2v3.2l-1.1-1.1-.7.8 2.3 2.3 2.3-2.3-.7-.8-1.1 1.1V8.6h-1z"/></svg>',
	'check'      => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"/></svg>',
	'cog'        => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13 19.9V21h-2v-1.1c-2.5-.4-4.5-2.4-4.9-4.9H5v-2h1.1C6.5 10.5 8.5 8.5 11 8.1V7h2v1.1c2.5.4 4.5 2.4 4.9 4.9H19v2h-1.1c-.4 2.5-2.4 4.5-4.9 4.9zM12 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>',
);

$svg = isset( $icons[ $icon ] ) ? $icons[ $icon ] : $icons['starFilled'];
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'wolf-blocks-feature-grid-item' ) ); ?>>
	<span class="wolf-blocks-feature-grid-item__icon"><?php echo $svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
	<h3 class="wolf-blocks-feature-grid-item__title"><?php echo wp_kses_post( $title ); ?></h3>
	<p class="wolf-blocks-feature-grid-item__description"><?php echo wp_kses_post( $desc ); ?></p>
</div>
