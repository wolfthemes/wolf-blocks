import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { columns } = attributes;

	const blockProps = useBlockProps.save({
		className: `wolf-blocks-feature-grid wolf-blocks-feature-grid--cols-${columns}`,
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
