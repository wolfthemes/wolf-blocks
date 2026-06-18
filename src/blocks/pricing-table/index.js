import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

function Edit({ attributes, setAttributes }) {
	const {
		tagline,
		title,
		htmlTag,
		price,
		currency,
		currencyPosition,
		offerPrice,
		pricePeriod,
		buttonText,
		buttonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		featured,
		featuredText,
		services,
	} = attributes;

	const blockProps = useBlockProps({
		className: `wolf-blocks-pricing-table${featured ? ' is-featured' : ''}`,
	});

	const currBefore = currencyPosition === 'before' ? currency : '';
	const currAfter = currencyPosition === 'after' ? currency : '';
	const displayPrice = offerPrice > 0 ? offerPrice : price;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'wolf-blocks')}>
					<TextControl
						label={__('Tagline', 'wolf-blocks')}
						value={tagline}
						onChange={val => setAttributes({ tagline: val })}
					/>
					<TextControl
						label={__('Title', 'wolf-blocks')}
						value={title}
						onChange={val => setAttributes({ title: val })}
					/>
					<SelectControl
						label={__('HTML Tag', 'wolf-blocks')}
						value={htmlTag}
						options={['h2', 'h3', 'h4', 'h5', 'h6'].map(tag => ({
							label: tag.toUpperCase(),
							value: tag,
						}))}
						onChange={val => setAttributes({ htmlTag: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Pricing', 'wolf-blocks')}>
					<TextControl
						label={__('Price', 'wolf-blocks')}
						type='number'
						value={price}
						min={0}
						onChange={val => setAttributes({ price: Number(val) })}
					/>
					<TextControl
						label={__('Currency Symbol', 'wolf-blocks')}
						value={currency}
						onChange={val => setAttributes({ currency: val })}
					/>
					<SelectControl
						label={__('Currency Position', 'wolf-blocks')}
						value={currencyPosition}
						options={[
							{
								label: __('Before', 'wolf-blocks'),
								value: 'before',
							},
							{
								label: __('After', 'wolf-blocks'),
								value: 'after',
							},
						]}
						onChange={val =>
							setAttributes({ currencyPosition: val })
						}
					/>
					<TextControl
						label={__('Offer Price (0 = disabled)', 'wolf-blocks')}
						type='number'
						value={offerPrice}
						min={0}
						onChange={val =>
							setAttributes({ offerPrice: Number(val) })
						}
					/>
					<TextControl
						label={__('Price Period', 'wolf-blocks')}
						value={pricePeriod}
						placeholder={__('e.g. / month', 'wolf-blocks')}
						onChange={val => setAttributes({ pricePeriod: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Button', 'wolf-blocks')}>
					<TextControl
						label={__('Button Text', 'wolf-blocks')}
						value={buttonText}
						onChange={val => setAttributes({ buttonText: val })}
					/>
					<TextControl
						label={__('Button URL', 'wolf-blocks')}
						value={buttonUrl}
						type='url'
						onChange={val => setAttributes({ buttonUrl: val })}
					/>
					<TextControl
						label={__('Secondary Button Text', 'wolf-blocks')}
						value={secondaryButtonText}
						onChange={val =>
							setAttributes({ secondaryButtonText: val })
						}
					/>
					<TextControl
						label={__('Secondary Button URL', 'wolf-blocks')}
						value={secondaryButtonUrl}
						type='url'
						onChange={val =>
							setAttributes({ secondaryButtonUrl: val })
						}
					/>
				</PanelBody>
				<PanelBody title={__('Badge', 'wolf-blocks')}>
					<ToggleControl
						label={__('Featured', 'wolf-blocks')}
						checked={featured}
						onChange={val => setAttributes({ featured: val })}
					/>
					{featured && (
						<TextControl
							label={__('Featured Text', 'wolf-blocks')}
							value={featuredText}
							onChange={val =>
								setAttributes({ featuredText: val })
							}
						/>
					)}
				</PanelBody>
				<PanelBody title={__('Services', 'wolf-blocks')}>
					{services.map((service, index) => (
						<div
							key={index}
							style={{ display: 'flex', gap: 8, marginBottom: 8 }}
						>
							<TextControl
								value={service}
								onChange={val => {
									const next = [...services];
									next[index] = val;
									setAttributes({ services: next });
								}}
							/>
							<Button
								isSmall
								isDestructive
								onClick={() =>
									setAttributes({
										services: services.filter(
											(_, i) => i !== index
										),
									})
								}
							>
								✕
							</Button>
						</div>
					))}
					<Button
						variant='secondary'
						onClick={() =>
							setAttributes({ services: [...services, ''] })
						}
					>
						{__('Add Feature', 'wolf-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{featured && (
					<span className='wolf-blocks-pricing-table__badge'>
						{featuredText}
					</span>
				)}
				<div className='wolf-blocks-pricing-table__header'>
					{tagline && (
						<p className='wolf-blocks-pricing-table__tagline'>
							{tagline}
						</p>
					)}
					<RichText
						tagName={htmlTag}
						className='wolf-blocks-pricing-table__title'
						value={title}
						onChange={val => setAttributes({ title: val })}
						placeholder={__('Plan Title…', 'wolf-blocks')}
					/>
				</div>
				<div className='wolf-blocks-pricing-table__price'>
					{offerPrice > 0 && (
						<span className='wolf-blocks-pricing-table__price-struck'>
							{currBefore}
							{price}
							{currAfter}
						</span>
					)}
					<span className='wolf-blocks-pricing-table__price-main'>
						{currBefore}
						{displayPrice}
						{currAfter}
					</span>
					{pricePeriod && (
						<span className='wolf-blocks-pricing-table__period'>
							{pricePeriod}
						</span>
					)}
				</div>
				{services.length > 0 && (
					<ul className='wolf-blocks-pricing-table__services'>
						{services.map((service, i) => (
							<li key={i}>{service}</li>
						))}
					</ul>
				)}
				<div className='wolf-blocks-pricing-table__ctas'>
					{buttonUrl && (
						<a
							href={buttonUrl}
							className='wp-element-button wolf-blocks-pricing-table__btn wolf-blocks-pricing-table__btn--primary'
						>
							{buttonText}
						</a>
					)}
					{secondaryButtonUrl && (
						<a
							href={secondaryButtonUrl}
							className='wp-element-button is-style-outline wolf-blocks-pricing-table__btn wolf-blocks-pricing-table__btn--secondary'
						>
							{secondaryButtonText}
						</a>
					)}
				</div>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
