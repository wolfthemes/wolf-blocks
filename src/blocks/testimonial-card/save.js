import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: 'wolf-blocks-testimonial-card',
	});
	return <div {...blockProps}></div>;
}
