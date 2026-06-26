/**
 * Shared editor implementation for the newsletter subscription blocks.
 *
 * Both the Mailchimp and Brevo blocks are the same form with the same
 * settings and appearance; they differ only in their provider config (which
 * list-ID label/help to show and which saved-key flag to read). Each block's
 * index.js calls `registerSubscribeBlock( metadata, providerConfig )`.
 */
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
import './subscribe-form.scss';

const SETTINGS_URL =
	'/wp-admin/options-general.php?page=wolf-blocks-newsletter';

/**
 * @param {Object} metadata                   Imported block.json.
 * @param {Object} providerConfig             Per-provider editor strings.
 * @param {string} providerConfig.listLabel   Label for the list/audience ID field.
 * @param {string} providerConfig.listHelp    Help text for that field.
 * @param {string} providerConfig.apiKeyFlag  Site-settings boolean exposed by REST.
 * @param {string} providerConfig.missingKey  Notice when no API key is saved.
 * @param {string} providerConfig.missingList Notice when no list ID is set.
 */
export function registerSubscribeBlock(metadata, providerConfig) {
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

		// Check whether this provider's API key has been saved in WP Admin.
		const apiKeyConfigured = useSelect(select => {
			const setting = select(coreStore).getEntityRecord('root', 'site');
			return setting?.[providerConfig.apiKeyFlag] ?? null;
		}, []);

		const missingListId = !listId;
		const missingApiKey = apiKeyConfigured === false;

		const blockProps = useBlockProps({
			className: 'wolf-blocks-subscribe-form',
		});

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Newsletter Settings', 'wolf-blocks')}
						initialOpen={missingListId}
					>
						<TextControl
							label={providerConfig.listLabel}
							help={providerConfig.listHelp}
							value={listId}
							onChange={val => setAttributes({ listId: val })}
						/>
						{missingApiKey && (
							<Notice status='warning' isDismissible={false}>
								{providerConfig.missingKey}
								<ExternalLink href={SETTINGS_URL}>
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
							onChange={val =>
								setAttributes({ buttonLabel: val })
							}
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
							onChange={val =>
								setAttributes({ successMessage: val })
							}
						/>
						<TextControl
							label={__('Server error', 'wolf-blocks')}
							value={errorMessage}
							onChange={val =>
								setAttributes({ errorMessage: val })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					{missingListId && (
						<Notice status='warning' isDismissible={false}>
							{providerConfig.missingList}
						</Notice>
					)}
					<form
						className='wolf-blocks-subscribe-form__form'
						onSubmit={e => e.preventDefault()}
					>
						{showName && (
							<div className='wolf-blocks-subscribe-form__field'>
								<input
									type='text'
									placeholder={namePlaceholder}
									disabled
								/>
							</div>
						)}
						<div className='wolf-blocks-subscribe-form__field'>
							<input
								type='email'
								placeholder={emailPlaceholder}
								disabled
							/>
						</div>
						<div className='wolf-blocks-subscribe-form__action'>
							<button
								type='submit'
								className='wp-element-button'
								disabled
							>
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
}
