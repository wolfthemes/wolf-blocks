import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import save from './save';

function Edit() {
	const blockProps = useBlockProps({
		className: 'wolf-blocks-stats-counter',
	});
	return (
		<div {...blockProps}>
			<p>{metadata.title} — coming soon</p>
		</div>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
