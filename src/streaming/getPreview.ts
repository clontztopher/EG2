import { parse, ParseResult } from 'papaparse';

export default function getPreview(srcFile: File): Promise<ParseResult> {
	return new Promise(res => {
		parse(srcFile, {
			preview: 1,
			complete: result => res(result)
		});
	});
}
