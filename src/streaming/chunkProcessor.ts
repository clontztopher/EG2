import { Column, ColumnTypes, IProcessorOptions } from '../types';

import applyFilters from './applyFilters';
import applyTransformations from './applyTransformations';

/**
 * Takes an array of arrays of strings and returns
 * an array of objects with column names as keys and
 * inner-array items as values. Only keeps data for
 * columns not set to IGNORE or otherwise filtered out.
 */
export default function chunkProcessor(
	chunk: string[][],
	opts: IProcessorOptions
) {
	const { columns, filters, transforms } = opts;
	// Reduce arrays by creating entities from each
	// and filtering/transforming them as specified.
	return chunk.reduce((acc, row) => {
		let entity = entityFromRow(row, columns);
		if (applyFilters(filters, entity)) {
			let transformed = applyTransformations(transforms, entity);
			return acc.concat(transformed);
		}
		return acc;
	}, []);
}

/**
 * Merge column names with array values
 * but only if they are not set to IGNORE.
 */
function entityFromRow(row: string[], cols: Column[]) {
	return row.reduce((acc: any, cur: any, i: number) => {
		const col = cols[i];
		if (col.type !== ColumnTypes.IGNORE) {
			acc[col.name] = cur;
		}
		return acc;
	}, {});
}
