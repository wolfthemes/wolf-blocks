const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'blocks/marquee/index': './src/blocks/marquee/index.js',
		'blocks/stats-counter/index': './src/blocks/stats-counter/index.js',
		'blocks/stats-counter/view': './src/blocks/stats-counter/view.js',
		'blocks/testimonial-card/index':
			'./src/blocks/testimonial-card/index.js',
		'blocks/pricing-table/index': './src/blocks/pricing-table/index.js',
		'blocks/countdown/index': './src/blocks/countdown/index.js',
		'blocks/countdown/view': './src/blocks/countdown/view.js',
		'blocks/comparison-table/index':
			'./src/blocks/comparison-table/index.js',
		'blocks/feature-grid/index': './src/blocks/feature-grid/index.js',
		'blocks/feature-grid-item/index':
			'./src/blocks/feature-grid-item/index.js',
		'blocks/mailchimp-form/index': './src/blocks/mailchimp-form/index.js',
		'blocks/mailchimp-form/view': './src/blocks/mailchimp-form/view.js',
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		...defaultConfig.plugins,
		// Copy block.json files from src to build so register_block_type() finds
		// them alongside the compiled JS.
		new CopyPlugin({
			patterns: [
				{
					from: 'src/blocks/*/block.json',
					to({ absoluteFilename }) {
						const blockDir = path.basename(
							path.dirname(absoluteFilename)
						);
						return `blocks/${blockDir}/block.json`;
					},
				},
			],
		}),
	],
};
