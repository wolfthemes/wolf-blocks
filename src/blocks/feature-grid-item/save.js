import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	Icon,
	starFilled,
	shield,
	thumbsUp,
	lock,
	plugins,
	layout,
	color,
	tag,
	people,
	archive,
	check,
	cog,
} from '@wordpress/icons';

const ICON_MAP = {
	starFilled,
	shield,
	thumbsUp,
	lock,
	plugins,
	layout,
	color,
	tag,
	people,
	archive,
	check,
	cog,
};

export default function save( { attributes } ) {
	const { icon, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wolf-blocks-feature-grid-item',
	} );

	const iconObj = ICON_MAP[ icon ] || starFilled;

	return (
		<div { ...blockProps }>
			<span className="wolf-blocks-feature-grid-item__icon">
				<Icon icon={ iconObj } />
			</span>
			<RichText.Content
				tagName="h3"
				className="wolf-blocks-feature-grid-item__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="wolf-blocks-feature-grid-item__description"
				value={ description }
			/>
		</div>
	);
}
