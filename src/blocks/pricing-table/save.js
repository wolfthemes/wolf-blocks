import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'wolf-blocks-pricing-table',
	});
	return <div {...blockProps}></div>;
}
