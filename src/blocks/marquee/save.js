import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { text, speed, repeat } = attributes;
	const blockProps = useBlockProps.save({ className: 'wolf-blocks-marquee' });

	return (
		<div {...blockProps}>
			<div
				className='wolf-blocks-marquee__track'
				style={{ '--wolf-marquee-speed': `${speed}s` }}
			>
				{Array.from({ length: repeat }, (_, i) => (
					<span key={i} className='wolf-blocks-marquee__item'>
						{text}
					</span>
				))}
			</div>
		</div>
	);
}
