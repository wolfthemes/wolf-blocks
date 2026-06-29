import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

function Stars({ rating }) {
	if (!rating) {
		return null;
	}
	const filled = Math.round(rating);
	const label = `${rating} ${__('out of 5', 'wolf-blocks')}`;
	return (
		<p className='wolf-blocks-testimonial-card__rating' aria-label={label}>
			{'★'.repeat(filled) + '☆'.repeat(5 - filled)}
		</p>
	);
}

function Edit({ attributes, setAttributes }) {
	const {
		content,
		avatarUrl,
		avatarId,
		authorName,
		authorTitle,
		link,
		imagePosition,
		textAlign,
		rating,
	} = attributes;

	const blockProps = useBlockProps({
		className: `wolf-blocks-testimonial-card wolf-blocks-testimonial-card--img-${imagePosition} has-text-align-${textAlign}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Content', 'wolf-blocks')}>
					<TextareaControl
						label={__('Quote', 'wolf-blocks')}
						value={content}
						onChange={val => setAttributes({ content: val })}
					/>
					<RangeControl
						label={__('Rating (0 = hidden)', 'wolf-blocks')}
						value={rating}
						min={0}
						max={5}
						step={0.5}
						onChange={val => setAttributes({ rating: val ?? 0 })}
					/>
					<TextControl
						label={__('Author Name', 'wolf-blocks')}
						value={authorName}
						onChange={val => setAttributes({ authorName: val })}
					/>
					<TextControl
						label={__('Author Title', 'wolf-blocks')}
						value={authorTitle}
						onChange={val => setAttributes({ authorTitle: val })}
					/>
					<TextControl
						label={__('Link URL', 'wolf-blocks')}
						value={link}
						type='url'
						onChange={val => setAttributes({ link: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Layout', 'wolf-blocks')}>
					<SelectControl
						label={__('Image Position', 'wolf-blocks')}
						value={imagePosition}
						options={[
							{ label: __('Left', 'wolf-blocks'), value: 'left' },
							{ label: __('Top', 'wolf-blocks'), value: 'top' },
						]}
						onChange={val => setAttributes({ imagePosition: val })}
					/>
					<SelectControl
						label={__('Text Align', 'wolf-blocks')}
						value={textAlign}
						options={[
							{ label: __('Left', 'wolf-blocks'), value: 'left' },
							{
								label: __('Center', 'wolf-blocks'),
								value: 'center',
							},
							{
								label: __('Right', 'wolf-blocks'),
								value: 'right',
							},
						]}
						onChange={val => setAttributes({ textAlign: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Avatar', 'wolf-blocks')}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media =>
								setAttributes({
									avatarUrl: media.url,
									avatarId: media.id,
								})
							}
							allowedTypes={['image']}
							value={avatarId}
							render={({ open }) => (
								<div>
									{avatarUrl && (
										<img
											src={avatarUrl}
											alt={__(
												'Avatar preview',
												'wolf-blocks'
											)}
											style={{
												width: 48,
												height: 48,
												objectFit: 'cover',
												borderRadius: '50%',
												display: 'block',
												marginBottom: 8,
											}}
										/>
									)}
									<Button
										variant={
											avatarUrl ? 'secondary' : 'primary'
										}
										onClick={open}
									>
										{avatarUrl
											? __('Change Avatar', 'wolf-blocks')
											: __(
													'Select Avatar',
													'wolf-blocks'
												)}
									</Button>
									{avatarUrl && (
										<Button
											variant='link'
											isDestructive
											onClick={() =>
												setAttributes({
													avatarUrl: '',
													avatarId: 0,
												})
											}
											style={{
												display: 'block',
												marginTop: 4,
											}}
										>
											{__('Remove Avatar', 'wolf-blocks')}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<figure {...blockProps}>
				<Stars rating={rating} />
				<blockquote className='wolf-blocks-testimonial-card__quote'>
					<p>
						{content ||
							__('Add your testimonial quote…', 'wolf-blocks')}
					</p>
				</blockquote>
				<figcaption className='wolf-blocks-testimonial-card__author'>
					{avatarUrl && (
						<img
							className='wolf-blocks-testimonial-card__avatar'
							src={avatarUrl}
							alt={authorName}
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
								{authorName || __('Author Name', 'wolf-blocks')}
							</a>
						) : (
							<span className='wolf-blocks-testimonial-card__name'>
								{authorName || __('Author Name', 'wolf-blocks')}
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
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
