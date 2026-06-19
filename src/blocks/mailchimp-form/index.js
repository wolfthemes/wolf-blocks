import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Notice,
	ExternalLink,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import metadata from './block.json';
import './style.scss';

function Edit({ attributes, setAttributes }) {
	const {
		listId,
		showName,
		buttonLabel,
		namePlaceholder,
		emailPlaceholder,
		emptyEmailMessage,
		invalidEmailMessage,
		emptyNameMessage,
		successMessage,
		errorMessage,
	} = attributes;

	// Check whether the API key has been saved in WP Admin settings.
	const apiKeyConfigured = useSelect(select => {
		const setting = select(coreStore).getEntityRecord('root', 'site');
		return setting?.wolf_blocks_mailchimp_api_key_set ?? null;
	}, []);

	const missingListId = !listId;
	const missingApiKey = apiKeyConfigured === false;

	const blockProps = useBlockProps({
		className: 'wolf-blocks-mailchimp-form',
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Mailchimp Settings', 'wolf-blocks')}
					initialOpen={missingListId}
				>
					<TextControl
						label={__('Audience List ID', 'wolf-blocks')}
						help={__(
							'Found in Mailchimp → Audience → Settings → Audience name and defaults.',
							'wolf-blocks'
						)}
						value={listId}
						onChange={val => setAttributes({ listId: val })}
					/>
					{missingApiKey && (
						<Notice status='warning' isDismissible={false}>
							{__('No Mailchimp API key found.', 'wolf-blocks')}
							<ExternalLink href='/wp-admin/options-general.php?page=wolf-blocks-mailchimp'>
								{__('Configure it here.', 'wolf-blocks')}
							</ExternalLink>
						</Notice>
					)}
				</PanelBody>
				<PanelBody
					title={__('Form Options', 'wolf-blocks')}
					initialOpen={false}
				>
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
				</PanelBody>
				<PanelBody
					title={__('Messages', 'wolf-blocks')}
					initialOpen={false}
				>
					{showName && (
						<TextControl
							label={__('Name required', 'wolf-blocks')}
							value={emptyNameMessage}
							onChange={val =>
								setAttributes({ emptyNameMessage: val })
							}
						/>
					)}
					<TextControl
						label={__('Email required', 'wolf-blocks')}
						value={emptyEmailMessage}
						onChange={val =>
							setAttributes({ emptyEmailMessage: val })
						}
					/>
					<TextControl
						label={__('Invalid email', 'wolf-blocks')}
						value={invalidEmailMessage}
						onChange={val =>
							setAttributes({ invalidEmailMessage: val })
						}
					/>
					<TextControl
						label={__('Success', 'wolf-blocks')}
						value={successMessage}
						onChange={val => setAttributes({ successMessage: val })}
					/>
					<TextControl
						label={__('Server error', 'wolf-blocks')}
						value={errorMessage}
						onChange={val => setAttributes({ errorMessage: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{missingListId && (
					<Notice status='warning' isDismissible={false}>
						{__(
							'Add your Mailchimp Audience List ID in the block settings.',
							'wolf-blocks'
						)}
					</Notice>
				)}
				<form
					className='wolf-blocks-mailchimp-form__form'
					onSubmit={e => e.preventDefault()}
				>
					{showName && (
						<div className='wolf-blocks-mailchimp-form__field'>
							<input
								type='text'
								placeholder={namePlaceholder}
								disabled
							/>
						</div>
					)}
					<div className='wolf-blocks-mailchimp-form__field'>
						<input
							type='email'
							placeholder={emailPlaceholder}
							disabled
						/>
					</div>
					<div className='wolf-blocks-mailchimp-form__action'>
						<button type='submit' disabled>
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
