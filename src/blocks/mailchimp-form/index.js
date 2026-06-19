import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Notice,
} from '@wordpress/components';
import metadata from './block.json';
import './style.scss';

function Edit({ attributes, setAttributes }) {
	const {
		apiKey,
		listId,
		showName,
		buttonLabel,
		namePlaceholder,
		emailPlaceholder,
		successMessage,
		errorMessage,
	} = attributes;

	const isMisconfigured = !apiKey || !listId;

	const blockProps = useBlockProps({
		className: 'wolf-blocks-mailchimp-form',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('API Settings', 'wolf-blocks')}
					initialOpen={isMisconfigured}
				>
					<TextControl
						label={__('Mailchimp API Key', 'wolf-blocks')}
						help={__(
							'Found in Mailchimp → Account → Extras → API keys.',
							'wolf-blocks'
						)}
						value={apiKey}
						onChange={val => setAttributes({ apiKey: val })}
						type="password"
						autoComplete="off"
					/>
					<TextControl
						label={__('Audience List ID', 'wolf-blocks')}
						help={__(
							'Found in Mailchimp → Audience → Settings → Audience name and defaults.',
							'wolf-blocks'
						)}
						value={listId}
						onChange={val => setAttributes({ listId: val })}
					/>
				</PanelBody>
				<PanelBody title={__('Form Options', 'wolf-blocks')}>
					<ToggleControl
						label={__('Ask for name', 'wolf-blocks')}
						checked={showName}
						onChange={val => setAttributes({ showName: val })}
					/>
					{showName && (
						<TextControl
							label={__('Name placeholder', 'wolf-blocks')}
							value={namePlaceholder}
							onChange={val =>
								setAttributes({ namePlaceholder: val })
							}
						/>
					)}
					<TextControl
						label={__('Email placeholder', 'wolf-blocks')}
						value={emailPlaceholder}
						onChange={val =>
							setAttributes({ emailPlaceholder: val })
						}
					/>
					<TextControl
						label={__('Button label', 'wolf-blocks')}
						value={buttonLabel}
						onChange={val => setAttributes({ buttonLabel: val })}
					/>
					<TextControl
						label={__('Success message', 'wolf-blocks')}
						value={successMessage}
						onChange={val => setAttributes({ successMessage: val })}
					/>
					<TextControl
						label={__('Error message', 'wolf-blocks')}
						value={errorMessage}
						onChange={val => setAttributes({ errorMessage: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{isMisconfigured && (
					<Notice status="warning" isDismissible={false}>
						{__(
							'Add your Mailchimp API Key and Audience List ID in the block settings.',
							'wolf-blocks'
						)}
					</Notice>
				)}
				<form
					className="wolf-blocks-mailchimp-form__form"
					onSubmit={e => e.preventDefault()}
				>
					{showName && (
						<div className="wolf-blocks-mailchimp-form__field">
							<input
								type="text"
								placeholder={namePlaceholder}
								disabled
							/>
						</div>
					)}
					<div className="wolf-blocks-mailchimp-form__field">
						<input
							type="email"
							placeholder={emailPlaceholder}
							disabled
						/>
					</div>
					<div className="wolf-blocks-mailchimp-form__action">
						<button type="submit" disabled>
							{buttonLabel}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	// Dynamic block — PHP render_callback outputs the frontend markup.
	save: () => null,
});
