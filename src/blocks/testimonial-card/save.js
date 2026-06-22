import { useBlockProps } from '@wordpress/block-editor';

function Stars({ rating }) {
	if (!rating) {
		return null;
	}
	const filled = Math.round(rating);
	return (
		<p
			className='wolf-blocks-testimonial-card__rating'
			aria-label={`${rating} out of 5`}
		>
			{'★'.repeat(filled) + '☆'.repeat(5 - filled)}
		</p>
	);
}

export default function save({ attributes }) {
	const {
		content,
		avatarUrl,
		name,
		authorTitle,
		link,
		imagePosition,
		textAlign,
		rating,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: `wolf-blocks-testimonial-card wolf-blocks-testimonial-card--img-${imagePosition} has-text-align-${textAlign}`,
	});

	return (
		<figure {...blockProps}>
			<Stars rating={rating} />
			<blockquote className='wolf-blocks-testimonial-card__quote'>
				<p>{content}</p>
			</blockquote>
			<figcaption className='wolf-blocks-testimonial-card__author'>
				{avatarUrl && (
					<img
						className='wolf-blocks-testimonial-card__avatar'
						src={avatarUrl}
						alt={name}
						width={48}
						height={48}
					/>
				)}
				<div className='wolf-blocks-testimonial-card__meta'>
					{link ? (
						<a
							href={link}
							className='wolf-blocks-testimonial-card__name'
						>
							{name}
						</a>
					) : (
						<span className='wolf-blocks-testimonial-card__name'>
							{name}
						</span>
					)}
					{authorTitle && (
						<span className='wolf-blocks-testimonial-card__title'>
							{authorTitle}
						</span>
					)}
				</div>
			</figcaption>
		</figure>
	);
}
