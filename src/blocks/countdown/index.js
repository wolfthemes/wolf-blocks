import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	DateTimePicker,
	Notice,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

function Edit( { attributes, setAttributes } ) {
	const { source, targetDate, label, expiredText, showDays, showSeconds } =
		attributes;

	const blockProps = useBlockProps( {
		className: 'wolf-blocks-countdown',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Source', 'wolf-blocks' ) }>
					<SelectControl
						label={ __( 'Source', 'wolf-blocks' ) }
						value={ source }
						options={ [
							{
								label: __( 'Manual Date', 'wolf-blocks' ),
								value: 'manual',
							},
							{
								label: __(
									'Wolf Store Active Offer',
									'wolf-blocks'
								),
								value: 'wolf-store-offer',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { source: val } )
						}
					/>
					{ source === 'manual' && (
						<DateTimePicker
							currentDate={ targetDate || null }
							onChange={ ( date ) =>
								setAttributes( { targetDate: date } )
							}
							is12Hour={ false }
						/>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Display', 'wolf-blocks' ) }>
					<TextControl
						label={ __( 'Label', 'wolf-blocks' ) }
						value={ label }
						onChange={ ( val ) =>
							setAttributes( { label: val } )
						}
					/>
					<TextControl
						label={ __( 'Expired Text', 'wolf-blocks' ) }
						value={ expiredText }
						onChange={ ( val ) =>
							setAttributes( { expiredText: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Days', 'wolf-blocks' ) }
						checked={ showDays }
						onChange={ ( val ) =>
							setAttributes( { showDays: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Seconds', 'wolf-blocks' ) }
						checked={ showSeconds }
						onChange={ ( val ) =>
							setAttributes( { showSeconds: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ source === 'wolf-store-offer' && (
					<Notice status="info" isDismissible={ false }>
						{ __(
							'This will read the live offer from Wolf Store on the frontend.',
							'wolf-blocks'
						) }
					</Notice>
				) }
				<span className="wolf-blocks-countdown__label">{ label }</span>
				<div className="wolf-blocks-countdown__units">
					{ showDays && (
						<div
							className="wolf-blocks-countdown__unit"
							data-unit="days"
						>
							<strong>00</strong>
							<small>{ __( 'days', 'wolf-blocks' ) }</small>
						</div>
					) }
					<div
						className="wolf-blocks-countdown__unit"
						data-unit="hours"
					>
						<strong>00</strong>
						<small>{ __( 'hrs', 'wolf-blocks' ) }</small>
					</div>
					<div
						className="wolf-blocks-countdown__unit"
						data-unit="minutes"
					>
						<strong>00</strong>
						<small>{ __( 'min', 'wolf-blocks' ) }</small>
					</div>
					{ showSeconds && (
						<div
							className="wolf-blocks-countdown__unit"
							data-unit="seconds"
						>
							<strong>00</strong>
							<small>{ __( 'sec', 'wolf-blocks' ) }</small>
						</div>
					) }
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
