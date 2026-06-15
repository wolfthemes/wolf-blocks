const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'blocks/marquee/index': './src/blocks/marquee/index.js',
		'blocks/stats-counter/index': './src/blocks/stats-counter/index.js',
		'blocks/testimonial-card/index':
			'./src/blocks/testimonial-card/index.js',
		'blocks/pricing-table/index': './src/blocks/pricing-table/index.js',
		// Frontend stylesheets — compiled separately so block.json can reference
		// them via "style": "file:./style.css" independent of the editor script.
		'blocks/marquee/style': './src/blocks/marquee/style.scss',
		'blocks/stats-counter/style': './src/blocks/stats-counter/style.scss',
		'blocks/testimonial-card/style':
			'./src/blocks/testimonial-card/style.scss',
		'blocks/pricing-table/style': './src/blocks/pricing-table/style.scss',
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
