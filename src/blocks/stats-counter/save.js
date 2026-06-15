import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'wolf-blocks-stats-counter',
	});
	return <div {...blockProps}></div>;
}
