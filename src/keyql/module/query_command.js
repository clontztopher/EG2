class KeyQLQueryCommand {
	constructor(keyQL, previousKeyQLQueryCommand, command) {
		this.keyQL = keyQL;
		this.previousKeyQLQueryCommand = previousKeyQLQueryCommand || null;
		this.command = command || null;
		this.updates = [];
	}

	static validateQuery(keyQLQuery) {
		if (!Array.isArray(keyQLQuery)) {
			throw new Error('KeyQL Query must be a valid array');
		}
		return keyQLQuery.map(keyQLQueryObject =>
			this.validateQueryObject(keyQLQueryObject)
		);
	}

	static validateQueryObject(keyQLQueryObject) {
		if (!keyQLQueryObject || typeof keyQLQueryObject !== 'object') {
			throw new Error('KeyQL Query Object must be a valid object');
		}
		let keys = Object.keys(keyQLQueryObject);
		return keys.map(key => {
			let blocks = key.split(KeyQLQueryCommand.DELIMITER);
			blocks.length === 1 && blocks.push(KeyQLQueryCommand.DEFAULT_OPERATOR);
			let operator = blocks.pop();
			let compare = KeyQLQueryCommand.OPERATORS[operator];
			if (!compare) {
				throw new Error(`Invalid KeyQL Operator: "${operator}"`);
			}
			return {
				key: blocks.join('__'),
				value: keyQLQueryObject[key],
				compare: compare
			};
		});
	}

	static validateLimit(keyQLLimit) {
		if (
			!keyQLLimit ||
			typeof keyQLLimit !== 'object' ||
			Array.isArray(keyQLLimit)
		) {
			throw new Error('KeyQL Limit object must be a valid object');
		}
		keyQLLimit = Object.keys(keyQLLimit).reduce((limit, key) => {
			limit[key] = keyQLLimit[key];
			return limit;
		}, {});
		keyQLLimit.offset = keyQLLimit.hasOwnProperty('offset')
			? keyQLLimit.offset
			: 0;
		keyQLLimit.count = keyQLLimit.hasOwnProperty('count')
			? keyQLLimit.count
			: 0;
		if (Object.keys(keyQLLimit).length !== 2) {
			throw new Error(
				'KeyQL Limit object must only contain "offset" and "count" properties'
			);
		}
		if (
			!(
				parseInt(keyQLLimit.offset) === keyQLLimit.offset &&
				parseInt(keyQLLimit.count) === keyQLLimit.count &&
				keyQLLimit.offset >= 0 &&
				keyQLLimit.count >= 0
			)
		) {
			throw new Error(
				'KeyQL Limit "offset" and "count" must be integers and greater than or equal to 0'
			);
		}
		return keyQLLimit;
	}

	select(keyQLQuery = []) {
		let query = this.constructor.validateQuery(keyQLQuery);
		return new this.constructor(this.keyQL, this, {
			type: 'select',
			value: query
		});
	}

	limit(keyQLLimit = { offset: 0, count: 0 }) {
		let limit = this.constructor.validateLimit(keyQLLimit);
		return new this.constructor(this.keyQL, this, {
			type: 'limit',
			value: limit
		});
	}

	values() {
		return this.__query__().map(row => this.keyQL._dataset[row.__keyqlid__]);
	}

	update(fields = {}) {
		fields = this.keyQL.constructor.validateFields(fields);
		if (this.keyQL.dataset().length === 0) {
			this.updates.push(fields);
			return this;
		}
		let keys = Object.keys(fields);
		let rows = this.__query__();
		let values = rows.map(row =>
			this.keyQL.__updateRow__(row.__keyqlid__, keys, fields)
		);
		this.keyQL.__initialize__(); // commit changes to dataset
		return values;
	}

	withData(data) {
		this.keyQL = new this.keyQL.constructor(data, this.keyQL._mapFunction);
		let len = this.updates.length;
		if (len > 0) {
			let fields = {};
			for (let i = 0; i <= len; i++) {
				for (let key in this.updates[i]) {
					fields[key] = this.updates[i][key];
				}
			}
			return this.update(fields);
		}

		return this.values();
	}

	__query__() {
		let commands = [];
		let rows = this.keyQL.rows();
		let keyQLInstruction = this;
		while (keyQLInstruction.command) {
			commands.push(keyQLInstruction.command);
			keyQLInstruction = keyQLInstruction.previousKeyQLQueryCommand;
		}
		while (commands.length) {
			let command = commands.pop();
			rows = this.__executeCommand__(rows, command);
		}
		return rows;
	}

	__executeCommand__(rows, command) {
		switch (command.type) {
			case 'select':
				return rows.filter(row =>
					this.__selectMapFunction__(command.value, row)
				);
				break;
			case 'limit':
				return rows.slice(
					command.value.offset,
					command.value.count
						? command.value.offset + command.value.count
						: command.value.offset + rows.length
				);
				break;
			default:
				return rows;
				break;
		}
	}

	__selectMapFunction__(keyQLQuery, row) {
		for (let i = 0; i < keyQLQuery.length; i++) {
			if (this.__matchQueryEntry__(keyQLQuery[i], row)) {
				return true;
			}
		}
		return false;
	}

	__matchQueryEntry__(keyQLQueryEntry, row) {
		for (let i = 0; i < keyQLQueryEntry.length; i++) {
			let statement = keyQLQueryEntry[i];
			let result;
			result = statement.compare(row[statement.key], statement.value);
			if (!result) {
				return false;
			}
		}
		return true;
	}
}

KeyQLQueryCommand.DELIMITER = '__';
KeyQLQueryCommand.DEFAULT_OPERATOR = 'is';
KeyQLQueryCommand.OPERATORS = require('./operators/operators.js');

module.exports = KeyQLQueryCommand;
