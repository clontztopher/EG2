import { ITransform } from '../types';
import transformSet from '../transforms/transformSet';
/**
 * Transform entity
 */
export default function applyTransformations(
	xForms: ITransform[],
	entity: any
) {
	if (xForms.length === 0) {
		return entity;
	}

	for (let xform of xForms) {
		if (transformSet.hasOwnProperty(xform.fn)) {
			let transformer = transformSet[xform.fn];
			entity[xform.attr] = transformer(entity[xform.attr]);
		} else {
			throw new Error('Transform name not recognized: ' + xform.fn);
		}
	}
	return entity;
}
