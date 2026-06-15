import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';
import './editor.scss';

function Edit({ attributes, setAttributes }) {
	const { text, speed, repeat } = attributes;
	const blockProps = useBlockProps({ className: 'wolf-blocks-marquee' });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Marquee Settings', 'wolf-blocks')}>
					<TextControl
						label={__('Text', 'wolf-blocks')}
						value={text}
						onChange={val => setAttributes({ text: val })}
					/>
					<RangeControl
						label={__('Speed (seconds)', 'wolf-blocks')}
						value={speed}
						onChange={val => setAttributes({ speed: val })}
						min={5}
						max={120}
					/>
					<RangeControl
						label={__('Repeat', 'wolf-blocks')}
						value={repeat}
						onChange={val => setAttributes({ repeat: val })}
						min={2}
						max={10}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div
					className='wolf-blocks-marquee__track'
					style={{ '--wolf-marquee-speed': `${speed}s` }}
				>
					{Array.from({ length: repeat }, (_, i) => (
						<span key={i} className='wolf-blocks-marquee__item'>
							{text}
						</span>
					))}
				</div>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
