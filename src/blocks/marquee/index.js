import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const { text, direction, animationDuration, link } = attributes;

	const blockProps = useBlockProps( { className: 'wolf-blocks-marquee' } );

	const arrow = direction === 'left' ? '←' : '→';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wolf-blocks' ) }>
					<TextareaControl
						label={ __( 'Text (HTML allowed)', 'wolf-blocks' ) }
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						help={ __(
							'Use <span class="…">…</span> for styled segments.',
							'wolf-blocks'
						) }
					/>
					<TextControl
						label={ __( 'Link URL', 'wolf-blocks' ) }
						value={ link }
						type="url"
						placeholder="https://"
						onChange={ ( val ) => setAttributes( { link: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Animation', 'wolf-blocks' ) }>
					<SelectControl
						label={ __( 'Direction', 'wolf-blocks' ) }
						value={ direction }
						options={ [
							{
								label: __( 'To the left', 'wolf-blocks' ),
								value: 'left',
							},
							{
								label: __( 'To the right', 'wolf-blocks' ),
								value: 'right',
							},
						] }
						onChange={ ( val ) => setAttributes( { direction: val } ) }
					/>
					<RangeControl
						label={ __( 'Duration (seconds)', 'wolf-blocks' ) }
						value={ animationDuration }
						min={ 5 }
						max={ 120 }
						step={ 1 }
						onChange={ ( val ) =>
							setAttributes( { animationDuration: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="wolf-blocks-marquee__track">
					<span
						className="wolf-blocks-marquee__item"
						dangerouslySetInnerHTML={ {
							__html:
								direction === 'left'
									? `${ arrow }  ${ text }`
									: `${ text }  ${ arrow }`,
						} }
					/>
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
