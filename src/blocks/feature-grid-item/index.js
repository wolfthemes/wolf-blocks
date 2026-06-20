import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import {
	Icon,
	starFilled,
	shield,
	thumbsUp,
	lock,
	plugins,
	layout,
	color,
	tag,
	people,
	archive,
	check,
	cog,
} from '@wordpress/icons';
import metadata from './block.json';
import save from './save';

export const ICON_MAP = {
	starFilled,
	shield,
	thumbsUp,
	lock,
	plugins,
	layout,
	color,
	tag,
	people,
	archive,
	check,
	cog,
};

const ICON_OPTIONS = [
	{ label: __('Star', 'wolf-blocks'), value: 'starFilled' },
	{ label: __('Shield', 'wolf-blocks'), value: 'shield' },
	{ label: __('Thumbs Up', 'wolf-blocks'), value: 'thumbsUp' },
	{ label: __('Lock', 'wolf-blocks'), value: 'lock' },
	{ label: __('Plugins', 'wolf-blocks'), value: 'plugins' },
	{ label: __('Layout', 'wolf-blocks'), value: 'layout' },
	{ label: __('Color', 'wolf-blocks'), value: 'color' },
	{ label: __('Tag', 'wolf-blocks'), value: 'tag' },
	{ label: __('People', 'wolf-blocks'), value: 'people' },
	{ label: __('Archive', 'wolf-blocks'), value: 'archive' },
	{ label: __('Check', 'wolf-blocks'), value: 'check' },
	{ label: __('Settings', 'wolf-blocks'), value: 'cog' },
];

function Edit({ attributes, setAttributes }) {
	const { icon, iconSize, title, description } = attributes;

	const blockProps = useBlockProps({
		className: 'wolf-blocks-feature-grid-item',
	});

	const iconObj = ICON_MAP[icon] || starFilled;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Icon', 'wolf-blocks')}>
					<SelectControl
						label={__('Icon', 'wolf-blocks')}
						value={icon}
						options={ICON_OPTIONS}
						onChange={val => setAttributes({ icon: val })}
					/>
					<RangeControl
						label={__('Icon size', 'wolf-blocks')}
						value={iconSize}
						min={16}
						max={96}
						step={4}
						onChange={val => setAttributes({ iconSize: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<span
					className='wolf-blocks-feature-grid-item__icon'
					style={{
						width: `${iconSize}px`,
						height: `${iconSize}px`,
					}}
				>
					<Icon icon={iconObj} />
				</span>
				<RichText
					tagName='h3'
					className='wolf-blocks-feature-grid-item__title'
					value={title}
					onChange={val => setAttributes({ title: val })}
					placeholder={__('Feature title…', 'wolf-blocks')}
				/>
				<RichText
					tagName='p'
					className='wolf-blocks-feature-grid-item__description'
					value={description}
					onChange={val => setAttributes({ description: val })}
					placeholder={__('Description…', 'wolf-blocks')}
				/>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
