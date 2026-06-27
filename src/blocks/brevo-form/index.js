import { __ } from '@wordpress/i18n';
import './style.scss';
import { registerSubscribeBlock } from '../../shared/subscribe-block';
import metadata from './block.json';

registerSubscribeBlock(metadata, {
	listLabel: __('Brevo List ID', 'wolf-blocks'),
	listHelp: __(
		'The numeric list ID from Brevo → Contacts → Lists.',
		'wolf-blocks'
	),
	apiKeyFlag: 'wolf_blocks_brevo_api_key_set',
	missingKey: __('No Brevo API key found.', 'wolf-blocks'),
	missingList: __(
		'Add your Brevo List ID in the block settings.',
		'wolf-blocks'
	),
});
