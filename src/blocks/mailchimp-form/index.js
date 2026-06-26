import { __ } from '@wordpress/i18n';
import { registerSubscribeBlock } from '../../shared/subscribe-block';
import metadata from './block.json';

registerSubscribeBlock(metadata, {
	listLabel: __('Audience List ID', 'wolf-blocks'),
	listHelp: __(
		'Found in Mailchimp → Audience → Settings → Audience name and defaults.',
		'wolf-blocks'
	),
	apiKeyFlag: 'wolf_blocks_mailchimp_api_key_set',
	missingKey: __('No Mailchimp API key found.', 'wolf-blocks'),
	missingList: __(
		'Add your Mailchimp Audience List ID in the block settings.',
		'wolf-blocks'
	),
});
