import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		startNumber,
		endNumber,
		prefix,
		suffix,
		title,
		animationDuration,
		thousandsSeparator,
		separatorStyle,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wolf-blocks-stats-counter',
		'data-start': startNumber,
		'data-end': endNumber,
		'data-duration': animationDuration,
		'data-thousands': thousandsSeparator,
		'data-separator': separatorStyle,
	} );

	return (
		<div { ...blockProps }>
			<div className="wolf-blocks-stats-counter__number">
				<span className="wolf-blocks-stats-counter__prefix">
					{ prefix }
				</span>
				<span className="wolf-blocks-stats-counter__value">
					{ endNumber }
				</span>
				<span className="wolf-blocks-stats-counter__suffix">
					{ suffix }
				</span>
			</div>
			<p className="wolf-blocks-stats-counter__title">{ title }</p>
		</div>
	);
}
