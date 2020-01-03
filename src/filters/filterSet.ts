import { IFilterSet } from '../types';

export default <IFilterSet>{
	includes: (a: string, b: string) =>
		a.toLowerCase().indexOf(b.toLowerCase()) > -1
};
