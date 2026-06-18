import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import metadata from './block.json';
import save from './save';
import './style.scss';

function ComparisonTablePreview({ title, usLabel, competitorLabel, rows }) {
	return (
		<div className='wolf-blocks-comparison-table'>
			<h3 className='wolf-blocks-comparison-table__title'>{title}</h3>
			<table className='wolf-blocks-comparison-table__table'>
				<thead>
					<tr>
						<th></th>
						<th>{usLabel}</th>
						<th>{competitorLabel}</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => {
						const usWins = row.us && !row.competitor;
						return (
							<tr
								key={i}
								className={usWins ? 'is-winning-row' : ''}
							>
								<td className='wolf-blocks-comparison-table__feature'>
									{row.feature}
								</td>
								<td
									className={`wolf-blocks-comparison-table__cell wolf-blocks-comparison-table__cell--us${usWins ? ' is-win' : ''}`}
								>
									{row.us ? '✓' : '—'}
								</td>
								<td className='wolf-blocks-comparison-table__cell wolf-blocks-comparison-table__cell--competitor'>
									{row.competitor ? '✓' : '—'}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function Edit({ attributes, setAttributes }) {
	const { title, usLabel, competitorLabel, rows } = attributes;

	const blockProps = useBlockProps();

	function updateRow(index, patch) {
		const next = rows.map((r, i) => (i === index ? { ...r, ...patch } : r));
		setAttributes({ rows: next });
	}

	function removeRow(index) {
		setAttributes({ rows: rows.filter((_, i) => i !== index) });
	}

	function moveRow(index, direction) {
		const next = [...rows];
		const swap = index + direction;
		[next[index], next[swap]] = [next[swap], next[index]];
		setAttributes({ rows: next });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Labels', 'wolf-blocks')}>
					<TextControl
						label={__('Title', 'wolf-blocks')}
						value={title}
						onChange={val => setAttributes({ title: val })}
					/>
					<TextControl
						label={__('Us Label', 'wolf-blocks')}
						value={usLabel}
						onChange={val => setAttributes({ usLabel: val })}
					/>
					<TextControl
						label={__('Competitor Label', 'wolf-blocks')}
						value={competitorLabel}
						onChange={val =>
							setAttributes({ competitorLabel: val })
						}
					/>
				</PanelBody>
				<PanelBody title={__('Rows', 'wolf-blocks')}>
					{rows.map((row, index) => (
						<div
							key={index}
							style={{
								borderBottom:
									'1px solid var(--wolf-border-color)',
								paddingBottom: 8,
								marginBottom: 8,
							}}
						>
							<TextControl
								label={__('Feature', 'wolf-blocks')}
								value={row.feature}
								onChange={val =>
									updateRow(index, { feature: val })
								}
							/>
							<ToggleControl
								label={__('Us ✓', 'wolf-blocks')}
								checked={row.us}
								onChange={val => updateRow(index, { us: val })}
							/>
							<ToggleControl
								label={__('Competitor ✓', 'wolf-blocks')}
								checked={row.competitor}
								onChange={val =>
									updateRow(index, { competitor: val })
								}
							/>
							<div style={{ display: 'flex', gap: 4 }}>
								<Button
									isSmall
									disabled={index === 0}
									onClick={() => moveRow(index, -1)}
								>
									▲
								</Button>
								<Button
									isSmall
									disabled={index === rows.length - 1}
									onClick={() => moveRow(index, 1)}
								>
									▼
								</Button>
								<Button
									isSmall
									isDestructive
									onClick={() => removeRow(index)}
								>
									✕
								</Button>
							</div>
						</div>
					))}
					<Button
						variant='secondary'
						onClick={() =>
							setAttributes({
								rows: [
									...rows,
									{
										feature: '',
										us: false,
										competitor: false,
									},
								],
							})
						}
					>
						{__('Add Row', 'wolf-blocks')}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ComparisonTablePreview
					title={title}
					usLabel={usLabel}
					competitorLabel={competitorLabel}
					rows={rows}
				/>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
