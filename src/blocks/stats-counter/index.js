import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	NumberControl,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

const SEPARATOR_CHARS = {
	default: ',',
	dots: '.',
	space: ' ',
	underscore: '_',
	apostrophe: "'",
};

function formatNumber(num, useSeparator, style) {
	if (!useSeparator) {
		return String(num);
	}
	const sep = SEPARATOR_CHARS[style] || ',';
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

function Edit({ attributes, setAttributes }) {
	const {
		title,
		startNumber,
		endNumber,
		prefix,
		suffix,
		animationDuration,
		thousandsSeparator,
		separatorStyle,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'wolf-blocks-stats-counter',
	});

	const displayNumber = formatNumber(
		endNumber,
		thousandsSeparator,
		separatorStyle
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'wolf-blocks')}>
					<TextControl
						label={__('Title', 'wolf-blocks')}
						value={title}
						onChange={val => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Prefix', 'wolf-blocks')}
						value={prefix}
						placeholder={__('e.g. $', 'wolf-blocks')}
						onChange={val => setAttributes({ prefix: val })}
					/>
					<TextControl
						label={__('Suffix', 'wolf-blocks')}
						value={suffix}
						placeholder={__('e.g. M+', 'wolf-blocks')}
						onChange={val => setAttributes({ suffix: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Number', 'wolf-blocks')}>
					<NumberControl
						label={__('Start Number', 'wolf-blocks')}
						value={startNumber}
						min={0}
						onChange={val =>
							setAttributes({ startNumber: Number(val) })
						}
					/>
					<NumberControl
						label={__('End Number', 'wolf-blocks')}
						value={endNumber}
						onChange={val =>
							setAttributes({ endNumber: Number(val) })
						}
					/>
					<NumberControl
						label={__('Animation Duration (ms)', 'wolf-blocks')}
						value={animationDuration}
						min={500}
						max={5000}
						step={100}
						onChange={val =>
							setAttributes({ animationDuration: Number(val) })
						}
					/>
				</PanelBody>
				<PanelBody title={__('Formatting', 'wolf-blocks')}>
					<ToggleControl
						label={__('Thousands Separator', 'wolf-blocks')}
						checked={thousandsSeparator}
						onChange={val =>
							setAttributes({ thousandsSeparator: val })
						}
					/>
					{thousandsSeparator && (
						<SelectControl
							label={__('Separator Style', 'wolf-blocks')}
							value={separatorStyle}
							options={[
								{
									label: __('Default (,)', 'wolf-blocks'),
									value: 'default',
								},
								{
									label: __('Dots (.)', 'wolf-blocks'),
									value: 'dots',
								},
								{
									label: __('Space', 'wolf-blocks'),
									value: 'space',
								},
								{
									label: __('Underscore (_)', 'wolf-blocks'),
									value: 'underscore',
								},
								{
									label: __("Apostrophe (')", 'wolf-blocks'),
									value: 'apostrophe',
								},
							]}
							onChange={val =>
								setAttributes({ separatorStyle: val })
							}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className='wolf-blocks-stats-counter__number'>
					<span className='wolf-blocks-stats-counter__prefix'>
						{prefix}
					</span>
					<span className='wolf-blocks-stats-counter__value'>
						{displayNumber}
					</span>
					<span className='wolf-blocks-stats-counter__suffix'>
						{suffix}
					</span>
				</div>
				<p className='wolf-blocks-stats-counter__title'>{title}</p>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
