import { IFilter } from '../types';
import filterSet from '../filters/filterSet';

/**
 * Test entity against filters.
 *
 * logic          &  &   ||   &  &
 * filters = [ [{},{},{}], [{},{},{}] ]
 */
export default function applyFilters(filters: IFilter[][], entity: any) {
	// Entity passes through
	// if no filters set
	if (filters.length === 0) {
		return true;
	}

	for (let andSet of filters) {
		// Start assuming filter will pass
		// so we can break loop when false.
		let passed = true;

		for (let fltr of andSet) {
			let filterFn;
			let result;

			if (filterSet.hasOwnProperty(fltr.fn)) {
				filterFn = filterSet[fltr.fn];
			} else {
				throw new Error('Filter name not recognized: ' + fltr.fn);
			}

			// If a filter is created that doesn't involve
			// including an undefined value then it is false
			// by default since the filter can't be applied.
			try {
				result = filterFn(entity[fltr.attr], fltr.val);
			} catch (e) {
				result = false;
			}

			// If any of the filters fail the group
			// fails, break out of the loop and
			// continue to next group of filters.
			if (!result) {
				passed = false;
				break;
			}
		}

		// The group has passed the filter,
		// which satisfies the requirement
		// of any group passing, return true.
		if (passed) {
			return true;
		}
	}

	// If all of the filter arrays have
	// been processed and true has not
	// yet been returned then the filter
	// failed and we can return false;
	return false;
}
