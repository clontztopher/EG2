const KeyQL = require('../module/index.js');
const expect = require('chai').expect;
const datasets = require('./datasets.json');
const moment = require('moment');

describe('KeyQL Setup Tests', () => {
	it('Should query an empty dataset with no parameters provided', () => {
		let rows = new KeyQL()
			.query()
			.select()
			.values();
		expect(rows.length).to.equal(0);
	});

	it('Should query an empty dataset directly', () => {
		let rows = new KeyQL([])
			.query()
			.select()
			.values();
		expect(rows.length).to.equal(0);
	});

	it('Should throw an error when a non-array dataset is provided', () => {
		let keyQL, error;
		try {
			keyQL = new KeyQL({});
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error when a non-array query is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select({})
				.values();
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error when a query is provided with an invalid operator', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL.query().select([{ key__NO_OP: true }]);
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error when an non-object limit is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit(true);
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error when an non-object (array) limit is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit([]);
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should not throw an error when an empty limit object is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit({});
		} catch (e) {
			error = e;
		}
		expect(error).to.not.exist;
	});

	it('Should not throw an error when a limit object with only "offset" is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit({ offset: 10 });
		} catch (e) {
			error = e;
		}
		expect(error).to.not.exist;
	});

	it('Should not throw an error when a limit object with only "count" is provided', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit({ count: 10 });
		} catch (e) {
			error = e;
		}
		expect(error).to.not.exist;
	});

	it('Should throw an error if limit object overloaded', () => {
		let rows, error;
		let keyQL = new KeyQL([]);
		try {
			rows = keyQL
				.query()
				.select([])
				.limit({ INVALID: 10 });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error if map function is not a function', () => {
		let keyQL, error;
		try {
			keyQL = new KeyQL([], true);
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});
});

describe('KeyQL Operator Tests', () => {
	let GOT;

	before(() => {
		GOT = new KeyQL(datasets.gameofthrones);
	});

	it('Should select query by a specific field (default)', () => {
		let rows = GOT.query()
			.select([{ last_name: 'Snow' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].last_name).to.equal('Snow');
		expect(rows[1].last_name).to.equal('Snow');
	});

	it('Should select query with "is" operator', () => {
		let rows = GOT.query()
			.select([{ last_name__is: 'Snow' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].last_name).to.equal('Snow');
		expect(rows[1].last_name).to.equal('Snow');
	});

	it('Should select query with "not" operator', () => {
		let rows = GOT.query()
			.select([{ last_name__not: 'Snow' }])
			.values();
		expect(rows.length).to.equal(4);
		expect(rows[0].last_name).to.equal('Stark');
		expect(rows[1].last_name).to.equal('Stark');
		expect(rows[2].last_name).to.equal('Bolton');
		expect(rows[3].last_name).to.equal('Stark');
	});

	it('Should select query with "gt" operator', () => {
		let rows = GOT.query()
			.select([{ age__gt: 33 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].age).to.be.gt(33);
		expect(rows[1].age).to.be.gt(33);
	});

	it('Should select query with "gte" operator', () => {
		let rows = GOT.query()
			.select([{ age__gte: 33 }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].age).to.be.gte(33);
		expect(rows[1].age).to.be.gte(33);
		expect(rows[2].age).to.be.gte(33);
	});

	it('Should select query with "lt" operator', () => {
		let rows = GOT.query()
			.select([{ age__lt: 33 }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].age).to.be.lt(33);
		expect(rows[1].age).to.be.lt(33);
		expect(rows[2].age).to.be.lt(33);
	});

	it('Should select query with "lte" operator', () => {
		let rows = GOT.query()
			.select([{ age__lte: 33 }])
			.values();
		expect(rows.length).to.equal(4);
		expect(rows[0].age).to.be.lte(33);
		expect(rows[1].age).to.be.lte(33);
		expect(rows[2].age).to.be.lte(33);
		expect(rows[3].age).to.be.lte(33);
	});

	it('Should select query with "icontains" operator', () => {
		let rows = GOT.query()
			.select([{ location__icontains: 'dread' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].location).to.equal('Dreadfort');
		expect(rows[1].location).to.equal('Dreadfort');
	});

	it('Should select query with "contains" operator', () => {
		let rows = GOT.query()
			.select([{ location__contains: 'dread' }])
			.values();
		expect(rows.length).to.equal(0);

		rows = GOT.query()
			.select([{ location__contains: 'Dread' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].location).to.equal('Dreadfort');
		expect(rows[1].location).to.equal('Dreadfort');
	});

	it('Should select query with "istartswith" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__istartswith: 'c' }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].first_name).to.equal('Catelyn');
	});

	it('Should select query with "startswith" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__startswith: 'c' }])
			.values();
		expect(rows.length).to.equal(0);

		rows = GOT.query()
			.select([{ first_name__startswith: 'C' }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].first_name).to.equal('Catelyn');
	});

	it('Should select query with "iendswith" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__iendswith: 'N' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].first_name).to.equal('Jon');
		expect(rows[1].first_name).to.equal('Catelyn');
	});

	it('Should select query with "endswith" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__endswith: 'N' }])
			.values();
		expect(rows.length).to.equal(0);

		rows = GOT.query()
			.select([{ first_name__endswith: 'n' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].first_name).to.equal('Jon');
		expect(rows[1].first_name).to.equal('Catelyn');
	});

	it('Should select query with "is_null" operator', () => {
		let rows = GOT.query()
			.select([{ lives_remaining__is_null: true }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].lives_remaining).to.equal(null);
	});

	it('Should select query with "not_null" operator', () => {
		let rows = GOT.query()
			.select([{ lives_remaining__not_null: true }])
			.values();
		expect(rows.length).to.equal(5);
		expect(rows[0].lives_remaining).to.not.equal(null);
		expect(rows[1].lives_remaining).to.not.equal(null);
		expect(rows[2].lives_remaining).to.not.equal(null);
		expect(rows[3].lives_remaining).to.not.equal(null);
		expect(rows[4].lives_remaining).to.not.equal(null);
	});

	it('Should select query with "is_true" operator', () => {
		let rows = GOT.query()
			.select([{ is_sean_bean__is_true: true }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].is_sean_bean).to.equal(true);
	});

	it('Should select query with "not_true" operator', () => {
		let rows = GOT.query()
			.select([{ is_sean_bean__not_true: true }])
			.values();
		expect(rows.length).to.equal(5);
		expect(rows[0].is_sean_bean).to.not.equal(true);
		expect(rows[1].is_sean_bean).to.not.equal(true);
		expect(rows[2].is_sean_bean).to.not.equal(true);
		expect(rows[3].is_sean_bean).to.not.equal(true);
		expect(rows[4].is_sean_bean).to.not.equal(true);
	});

	it('Should select query with "is_false" operator', () => {
		let rows = GOT.query()
			.select([{ is_sean_bean__is_false: true }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].is_sean_bean).to.equal(false);
		expect(rows[1].is_sean_bean).to.equal(false);
	});

	it('Should select query with "not_false" operator', () => {
		let rows = GOT.query()
			.select([{ is_sean_bean__not_false: true }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].is_sean_bean).to.not.equal(false);
		expect(rows[1].is_sean_bean).to.not.equal(false);
		expect(rows[2].is_sean_bean).to.not.equal(false);
	});

	it('Should select query with "in" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__in: ['Eddard', 'Catelyn'] }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].first_name).to.be.oneOf(['Eddard', 'Catelyn']);
		expect(rows[1].first_name).to.be.oneOf(['Eddard', 'Catelyn']);
	});

	it('Should select query with "not_in" operator', () => {
		let rows = GOT.query()
			.select([{ first_name__not_in: ['Arya', 'Jon'] }])
			.values();
		expect(rows.length).to.equal(4);
		expect(rows[0].first_name).to.not.be.oneOf(['Arya', 'Jon']);
		expect(rows[1].first_name).to.not.be.oneOf(['Arya', 'Jon']);
		expect(rows[2].first_name).to.not.be.oneOf(['Arya', 'Jon']);
		expect(rows[3].first_name).to.not.be.oneOf(['Arya', 'Jon']);
	});
});

describe('KeyQL Date Operator Tests', () => {
	it('Should select query with "recency_lt", "recency_lte" operator', () => {
		let hours = [4, 3, 2, 1, 0];
		let datestrings = hours.map(h => {
			return moment
				.utc(moment.now() - h * 60 * 60 * 1000)
				.format('MM/DD/YYYY HH:mm:ss', 'UTC');
		});
		let dataset = datestrings.map((ds, i) => {
			return {
				index: i,
				date: ds
			};
		});

		let rows = new KeyQL(dataset)
			.query()
			.select([{ date__recency_lt: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(3);
		expect(rows[1].index).to.equal(4);

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__recency_lte: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(3);
		expect(rows[1].index).to.equal(4);
	});

	it('Should select query with "recency_gt", "recency_gte" operator', () => {
		let hours = [4, 3, 2, 1, 0];
		let datestrings = hours.map(h => {
			return moment
				.utc(moment.now() - h * 60 * 60 * 1000)
				.format('MM/DD/YYYY HH:mm:ss', 'UTC');
		});
		let dataset = datestrings.map((ds, i) => {
			return {
				index: i,
				date: ds
			};
		});

		let rows = new KeyQL(dataset)
			.query()
			.select([{ date__recency_gt: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].index).to.equal(0);
		expect(rows[1].index).to.equal(1);
		expect(rows[2].index).to.equal(2);

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__recency_gte: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].index).to.equal(0);
		expect(rows[1].index).to.equal(1);
		expect(rows[2].index).to.equal(2);
	});

	it('Should select query with "upcoming_lt", "upcoming_lte" operator', () => {
		let hours = [4, 3, 2, 1, 0];
		let datestrings = hours.map(h => {
			return moment
				.utc(moment.now() + h * 60 * 60 * 1000)
				.format('MM/DD/YYYY HH:mm:ss', 'UTC');
		});
		let dataset = datestrings.map((ds, i) => {
			return {
				index: i,
				date: ds
			};
		});

		let rows = new KeyQL(dataset)
			.query()
			.select([{ date__upcoming_lt: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(2);
		expect(rows[1].index).to.equal(3);

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__upcoming_lte: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(2);
		expect(rows[1].index).to.equal(3);
	});

	it('Should select query with "upcoming_gt", "upcoming_gte" operator', () => {
		let hours = [4, 3, 2, 1, 0];
		let datestrings = hours.map(h => {
			return moment
				.utc(moment.now() + h * 60 * 60 * 1000)
				.format('MM/DD/YYYY HH:mm:ss', 'UTC');
		});
		let dataset = datestrings.map((ds, i) => {
			return {
				index: i,
				date: ds
			};
		});

		let rows = new KeyQL(dataset)
			.query()
			.select([{ date__upcoming_gt: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(0);
		expect(rows[1].index).to.equal(1);

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__upcoming_gte: 2 * 60 * 60 }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(0);
		expect(rows[1].index).to.equal(1);
	});

	it('Should select query with "date_lt" operator', () => {
		let dataset = [
			{ index: 0, date: '11/30/1987' },
			{ index: 1, date: '12/06/1988' },
			{ index: 2, date: '12/13/1989' }
		];

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__lt: '12/06/1988' }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].index).to.equal(0);
	});

	it('Should select query with "date_lte" operator', () => {
		let dataset = [
			{ index: 0, date: '11/30/1987' },
			{ index: 1, date: '12/06/1988' },
			{ index: 2, date: '12/13/1989' }
		];

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__lte: '12/06/1988' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(0);
		expect(rows[1].index).to.equal(1);
	});

	it('Should select query with "date_gt" operator', () => {
		let dataset = [
			{ index: 0, date: '11/30/1987' },
			{ index: 1, date: '12/06/1988' },
			{ index: 2, date: '12/13/1989' }
		];

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__gt: '12/06/1988' }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].index).to.equal(2);
	});

	it('Should select query with "date_gte" operator', () => {
		let dataset = [
			{ index: 0, date: '11/30/1987' },
			{ index: 1, date: '12/06/1988' },
			{ index: 2, date: '12/13/1989' }
		];

		rows = new KeyQL(dataset)
			.query()
			.select([{ date__gte: '12/06/1988' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].index).to.equal(1);
		expect(rows[1].index).to.equal(2);
	});
});

describe('KeyQL Map Tests', () => {
	let SHEETS;

	before(() => {
		SHEETS = new KeyQL(datasets.spreadsheet, v => v.fields);
	});

	it('Should map to an internal fieldset properly', () => {
		let rows = SHEETS.query()
			.select([{ name: 'Isabelle' }])
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].fields).to.exist;
		expect(rows[0].fields.name).to.equal('Isabelle');
	});

	it('Should map to an internal fieldset and execute OR properly', () => {
		let rows = SHEETS.query()
			.select([{ name: 'Isabelle' }, { name: 'Frank' }])
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].fields).to.exist;
		expect(rows[0].fields.name).to.equal('Frank');
		expect(rows[1].fields).to.exist;
		expect(rows[1].fields.name).to.equal('Isabelle');
	});
});

describe('KeyQL Limit Tests', () => {
	let SHEETS;

	before(() => {
		SHEETS = new KeyQL(datasets.spreadsheet, v => v.fields);
	});

	it('Should run a select query without a limit set', () => {
		let rows = SHEETS.query()
			.select([{ pets: '0' }])
			.limit({})
			.values();
		expect(rows.length).to.equal(3);
		expect(rows[0].fields.pets).to.equal('0');
		expect(rows[1].fields.pets).to.equal('0');
		expect(rows[2].fields.pets).to.equal('0');
		expect(rows[0].id).to.equal(3);
		expect(rows[1].id).to.equal(8);
		expect(rows[2].id).to.equal(9);
	});

	it('Should run a select query with a limit offset', () => {
		let rows = SHEETS.query()
			.select([{ pets: '0' }])
			.limit({ offset: 1 })
			.values();
		expect(rows.length).to.equal(2);
		expect(rows[0].fields.pets).to.equal('0');
		expect(rows[1].fields.pets).to.equal('0');
		expect(rows[0].id).to.equal(8);
		expect(rows[1].id).to.equal(9);
	});

	it('Should run a select query with a limit count', () => {
		let rows = SHEETS.query()
			.select([{ pets: '0' }])
			.limit({ count: 1 })
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].fields.pets).to.equal('0');
		expect(rows[0].id).to.equal(3);
	});

	it('Should run a select query with a limit offset and count', () => {
		let rows = SHEETS.query()
			.select([{ pets: '0' }])
			.limit({ offset: 1, count: 1 })
			.values();
		expect(rows.length).to.equal(1);
		expect(rows[0].fields.pets).to.equal('0');
		expect(rows[0].id).to.equal(8);
	});

	it('Should throw an error with a negative limit offset', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ offset: -1 });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error with an invalid limit offset', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ offset: 'LOL' });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error with a float limit offset', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ offset: 2.2 });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error with a negative limit count', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ count: -1 });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error with an invalid limit count', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ count: 'LOL' });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});

	it('Should throw an error with a float limit count', () => {
		let rows, error;
		try {
			rows = SHEETS.query()
				.select([{ pets: '0' }])
				.limit({ count: 2.2 });
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});
});

describe('KeyQL Update Tests', () => {
	let SHEETS;

	before(() => {
		SHEETS = new KeyQL(datasets.spreadsheet, v => v.fields);
	});

	it('Should run an update query', () => {
		let rows = SHEETS.query()
			.select([{ pets: '0' }])
			.update({ pets: null });
		expect(rows.length).to.equal(3);
		expect(rows[0].fields.pets).to.equal(null);
		expect(rows[1].fields.pets).to.equal(null);
		expect(rows[2].fields.pets).to.equal(null);
		expect(rows[0].id).to.equal(3);
		expect(rows[1].id).to.equal(8);
		expect(rows[2].id).to.equal(9);

		rows = SHEETS.query()
			.select([{ pets: '0' }])
			.values();
		expect(rows.length).to.equal(0);
	});

	it('Should keep track of updated rows', () => {
		let rows = SHEETS.changeset();
		expect(rows.length).to.equal(3);
		expect(rows[0].fields.pets).to.equal(null);
		expect(rows[1].fields.pets).to.equal(null);
		expect(rows[2].fields.pets).to.equal(null);
		expect(rows[0].id).to.equal(3);
		expect(rows[1].id).to.equal(8);
		expect(rows[2].id).to.equal(9);
	});

	it('Should commit updates to a cloned dataset', () => {
		let COMMIT = SHEETS.commit();
		let rows = SHEETS.changeset();
		expect(rows.length).to.equal(3);

		rows = COMMIT.changeset();
		expect(rows.length).to.equal(0);

		rows = COMMIT.query()
			.select([{ pets: '0' }])
			.values();
		expect(rows.length).to.equal(0);

		rows = COMMIT.query()
			.select([{ pets: null }])
			.values();
		expect(rows.length).to.equal(3);
	});
});

describe('KeyQL Preload Tests', () => {
	let instance;

	before(() => (instance = new KeyQL()));

	it('Should allow for loading query before data.', () => {
		let findEddard = instance.query().select([{ first_name: 'Eddard' }]);

		let dataset1 = findEddard.withData(datasets['gameofthrones']);
		let dataset2 = findEddard.withData(datasets['gameofthrones']);
		let dataset3 = findEddard.withData(datasets['gameofthrones']);

		expect(dataset1[0].first_name).to.equal('Eddard');
		expect(dataset2[0].first_name).to.equal('Eddard');
		expect(dataset3[0].first_name).to.equal('Eddard');
	});

	it('Should run any updates after query.', () => {
		let updateJon = instance
			.query()
			.select([{ first_name: 'Jon' }])
			.update({ age: 27 });
		let olderJon = updateJon.withData(datasets['gameofthrones']);
		expect(olderJon[0].age).to.equal(27);
	});

	it('Should run faster in stream-like scenario than data-initialized version.', () => {
		let data = Array.apply(null, new Array(20000)).map(
			() => datasets['spreadsheet']
		);

		/**
		 * Data First
		 */
		console.time('DataFirst');
		for (let i = 0; i < data.length; i++) {
			let chunk = data[i].slice();
			let dataset = new KeyQL(chunk, v => v.fields);
			let result = dataset
				.query()
				.select([{ pets: '2' }])
				.values();
		}
		console.timeEnd('DataFirst');

		/**
		 * Query First
		 *
		 * 60% faster on average
		 */
		console.time('DataLast');
		let twoPets = new KeyQL([], x => x.fields).query().select([{ pets: '2' }]);
		for (let j = 0; j < data.length; j++) {
			let chunk = data[j].slice();
			let result = twoPets.withData(chunk);
		}
		console.timeEnd('DataLast');
	});
});
