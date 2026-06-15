import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { text, direction, animationDuration, link } = attributes;

	const blockProps = useBlockProps.save({
		className: 'wolf-blocks-marquee',
		style: { '--wolf-marquee-duration': `${animationDuration}s` },
	});

	const items = Array.from({ length: 6 }, (_, i) => (
		<span key={i} className='wolf-blocks-marquee__item'>
			{text}
		</span>
	));

	const track = (
		<div
			className={`wolf-blocks-marquee__track wolf-blocks-marquee__track--${direction}`}
		>
			{items}
		</div>
	);

	return (
		<div {...blockProps}>{link ? <a href={link}>{track}</a> : track}</div>
	);
}
