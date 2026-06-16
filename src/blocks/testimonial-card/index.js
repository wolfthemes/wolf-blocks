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
	Button,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

function Edit( { attributes, setAttributes } ) {
	const {
		content,
		avatarUrl,
		avatarId,
		name,
		authorTitle,
		link,
		imagePosition,
		textAlign,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wolf-blocks-testimonial-card wolf-blocks-testimonial-card--img-${ imagePosition } has-text-align-${ textAlign }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wolf-blocks' ) }>
					<TextareaControl
						label={ __( 'Quote', 'wolf-blocks' ) }
						value={ content }
						onChange={ ( val ) => setAttributes( { content: val } ) }
					/>
					<TextControl
						label={ __( 'Author Name', 'wolf-blocks' ) }
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
					/>
					<TextControl
						label={ __( 'Author Title', 'wolf-blocks' ) }
						value={ authorTitle }
						onChange={ ( val ) => setAttributes( { authorTitle: val } ) }
					/>
					<TextControl
						label={ __( 'Link URL', 'wolf-blocks' ) }
						value={ link }
						type="url"
						onChange={ ( val ) => setAttributes( { link: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'wolf-blocks' ) }>
					<SelectControl
						label={ __( 'Image Position', 'wolf-blocks' ) }
						value={ imagePosition }
						options={ [
							{ label: __( 'Left', 'wolf-blocks' ), value: 'left' },
							{ label: __( 'Top', 'wolf-blocks' ), value: 'top' },
						] }
						onChange={ ( val ) => setAttributes( { imagePosition: val } ) }
					/>
					<SelectControl
						label={ __( 'Text Align', 'wolf-blocks' ) }
						value={ textAlign }
						options={ [
							{ label: __( 'Left', 'wolf-blocks' ), value: 'left' },
							{
								label: __( 'Center', 'wolf-blocks' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'wolf-blocks' ),
								value: 'right',
							},
						] }
						onChange={ ( val ) => setAttributes( { textAlign: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Avatar', 'wolf-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									avatarUrl: media.url,
									avatarId: media.id,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ avatarId }
							render={ ( { open } ) => (
								<div>
									{ avatarUrl && (
										<img
											src={ avatarUrl }
											alt={ __(
												'Avatar preview',
												'wolf-blocks'
											) }
											style={ {
												width: 48,
												height: 48,
												objectFit: 'cover',
												borderRadius: '50%',
												display: 'block',
												marginBottom: 8,
											} }
										/>
									) }
									<Button
										variant={
											avatarUrl ? 'secondary' : 'primary'
										}
										onClick={ open }
									>
										{ avatarUrl
											? __( 'Change Avatar', 'wolf-blocks' )
											: __(
												'Select Avatar',
												'wolf-blocks'
											) }
									</Button>
									{ avatarUrl && (
										<Button
											variant="link"
											isDestructive
											onClick={ () =>
												setAttributes( {
													avatarUrl: '',
													avatarId: 0,
												} )
											}
											style={ {
												display: 'block',
												marginTop: 4,
											} }
										>
											{ __( 'Remove Avatar', 'wolf-blocks' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				<blockquote className="wolf-blocks-testimonial-card__quote">
					<p>
						{ content ||
							__( 'Add your testimonial quote…', 'wolf-blocks' ) }
					</p>
				</blockquote>
				<figcaption className="wolf-blocks-testimonial-card__author">
					{ avatarUrl && (
						<img
							className="wolf-blocks-testimonial-card__avatar"
							src={ avatarUrl }
							alt={ name }
							width={ 48 }
							height={ 48 }
						/>
					) }
					<div className="wolf-blocks-testimonial-card__meta">
						{ link ? (
							<a
								href={ link }
								className="wolf-blocks-testimonial-card__name"
							>
								{ name || __( 'Author Name', 'wolf-blocks' ) }
							</a>
						) : (
							<span className="wolf-blocks-testimonial-card__name">
								{ name || __( 'Author Name', 'wolf-blocks' ) }
							</span>
						) }
						{ authorTitle && (
							<span className="wolf-blocks-testimonial-card__title">
								{ authorTitle }
							</span>
						) }
					</div>
				</figcaption>
			</figure>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
