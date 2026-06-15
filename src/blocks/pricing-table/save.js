import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: `wolf-blocks-pricing-table${featured ? ' is-featured' : ''}`,
	});

	const currBefore = currencyPosition === 'before' ? currency : '';
	const currAfter = currencyPosition === 'after' ? currency : '';
	const displayPrice = offerPrice > 0 ? offerPrice : price;

	return (
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
				<RichText.Content
					tagName={htmlTag}
					className='wolf-blocks-pricing-table__title'
					value={title}
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
						className='wolf-blocks-pricing-table__btn wolf-blocks-pricing-table__btn--primary'
					>
						{buttonText}
					</a>
				)}
				{secondaryButtonUrl && (
					<a
						href={secondaryButtonUrl}
						className='wolf-blocks-pricing-table__btn wolf-blocks-pricing-table__btn--secondary'
					>
						{secondaryButtonText}
					</a>
				)}
			</div>
		</div>
	);
}
