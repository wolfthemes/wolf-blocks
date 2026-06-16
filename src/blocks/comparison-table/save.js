import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, usLabel, competitorLabel, rows } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wolf-blocks-comparison-table',
	} );

	return (
		<div { ...blockProps }>
			<h3 className="wolf-blocks-comparison-table__title">{ title }</h3>
			<table className="wolf-blocks-comparison-table__table">
				<thead>
					<tr>
						<th></th>
						<th>{ usLabel }</th>
						<th>{ competitorLabel }</th>
					</tr>
				</thead>
				<tbody>
					{ rows.map( ( row, i ) => {
						const usWins = row.us && ! row.competitor;
						return (
							<tr
								key={ i }
								className={ usWins ? 'is-winning-row' : '' }
							>
								<td className="wolf-blocks-comparison-table__feature">
									{ row.feature }
								</td>
								<td
									className={ `wolf-blocks-comparison-table__cell wolf-blocks-comparison-table__cell--us${ usWins ? ' is-win' : '' }` }
								>
									{ row.us ? '✓' : '—' }
								</td>
								<td className="wolf-blocks-comparison-table__cell wolf-blocks-comparison-table__cell--competitor">
									{ row.competitor ? '✓' : '—' }
								</td>
							</tr>
						);
					} ) }
				</tbody>
			</table>
		</div>
	);
}
