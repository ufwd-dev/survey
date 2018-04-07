'use strict';

const {validateRangeByLength, resolve, Range} = require('../src/util/range');

const assert = require('assert');

describe('resolve', function () {

	it('There is no rule match.', function () {
		const expression = '11111';

		try {
			resolve(expression);
		} catch (e) {
			assert.equal(e.message, 'No rule matched.');
		}
	});

	it('There is the first rule match.', function () {

		const expression = '1';
		const result = resolve(expression);

		assert.deepEqual(result, {
			from: 1,
			to: 1
		});
	});

	describe('There is the second rule match.', function () {

		it('from > to', function () {
			const expression = '2 , 1';

			try {
				resolve(expression);
			} catch (e) {
				assert.equal(e.message, 'It MUST be from <= to.');
			}
		});

		it('It is normal', function () {
			const expression = '1 , 2';
			const result = resolve(expression);
	
			assert.deepEqual(result, {
				from: 1,
				to: 2
			});
		});
	});

	it('The from < 0', function () {
		const expression = '-1 , 2';
		try {
			resolve(expression);
		} catch (e) {
			assert.equal(e.message, 'No rule matched.');
		}
	});
});

describe('validateRangeByLength', function () {

	it('The to > length', function () {

		try {
			validateRangeByLength({
				from: 1,
				to: 2
			}, 1);

		} catch (e) {
			assert.equal(e.message, 'The to should < length');
		}
	});

	it('Nothing error', function () {
		const result = validateRangeByLength({
			from: 1,
			to: 2
		}, 3);

		assert.equal(result, true);
	});
});

describe('Range', function () {
	it('Create a error range', function () {

		try {
			new Range(3, '111111', );
		} catch (e) {
			assert.equal(e.message, 'No rule matched.');
		}
	
	});

	it('Create a to > length range', function () {

		try {
			new Range(3, ' 1 , 6 ');
			
		} catch (e) {
			assert.equal(e.message, 'The to should < length');
		}
	});

	it('Create a to > length range', function () {

		try {
			new Range(3, ' -1 , 2 ');
		} catch (e) {
			assert.equal(e.message, 'No rule matched.');
		}
	});

	it('Create a normal range', function () {
		const range = new Range(3);

		assert.deepEqual(range, {
			from: 1,
			to: 1
		});
	});

	describe('Range validate sample', function () {

		const range = new Range(7, '1 , 6');

		it('', function () {
			const result = range.validateSample('7');

			assert.equal(result, false);
		});

		it('', function () {
			const result = range.validateSample(3);

			assert.equal(result, true);
		});
	});

});

