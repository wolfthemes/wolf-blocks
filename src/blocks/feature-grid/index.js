import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

const TEMPLATE = [
	[
		'wolf-blocks/feature-grid-item',
		{
			icon: 'starFilled',
			title: 'Feature 1',
			description: 'Short one-line description.',
		},
	],
	[
		'wolf-blocks/feature-grid-item',
		{
			icon: 'shield',
			title: 'Feature 2',
			description: 'Short one-line description.',
		},
	],
	[
		'wolf-blocks/feature-grid-item',
		{
			icon: 'thumbsUp',
			title: 'Feature 3',
			description: 'Short one-line description.',
		},
	],
	[
		'wolf-blocks/feature-grid-item',
		{
			icon: 'lock',
			title: 'Feature 4',
			description: 'Short one-line description.',
		},
	],
];

function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;

	const blockProps = useBlockProps({
		className: `wolf-blocks-feature-grid wolf-blocks-feature-grid--cols-${columns}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout', 'wolf-blocks')}>
					<RangeControl
						label={__('Columns', 'wolf-blocks')}
						value={columns}
						min={2}
						max={4}
						onChange={val => setAttributes({ columns: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={['wolf-blocks/feature-grid-item']}
					template={TEMPLATE}
				/>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
