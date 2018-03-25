'use strict';

const voteResolve = require('../src/util/vote/resolve');

const assert = require('assert');

describe('surveyResolve test', function() {

	it('argument 0 is not an object test', function() {
		try {
			voteResolve(1, {}, '');
		} catch (error) {
			assert.equal(error.message, 'The argument 0 required an object');
		}
	});

	it('argument 1 is not an object test', function() {
		try {
			voteResolve({}, 1, '');
		} catch (error) {
			assert.equal(error.message, 'The argument 1 required an object');
		}
	});

	it('argument 2 is not an string test', function() {
		try {
			voteResolve({}, {}, 1);
		} catch (error) {
			assert.equal(error.message, 'The argument 2 required an string');
		}
	});

	it('options of item of argument 1 is not an array test', function() {
		const content = {};
		const sample = 'A';

		try {
			voteResolve({}, content, sample);
		} catch (error) {
			assert.equal(error.message, 'The options of the item of argument 1 required an array');
		}
	});

	it('radio test', function() {
		const content = {
			type: '单选',
			options: [{
				option: 'A',
				content: '选项一'
			}]
		};

		const sample = 'A,B';

		const result = voteResolve({}, content, sample);

		assert.deepEqual(result, {
			'A': {
				number: 1,
				content: '选项一'
			}
		});
	});

	it('multiple-select test', function() {
		const content = {
			type: '多选',
			options: [{
				option: 'A',
				content: '选项一'
			}]
		};

		const sample = 'A,B';

		const result = voteResolve({}, content, sample);

		assert.deepEqual(result, {
			'A': {
				number: 1,
				content: '选项一'
			},
			'B': {
				number: 1,
				content: undefined
			}
		});
	});

	it('multiple-select repeate choose test', function() {
		const content = {
			type: '多选',
			options: [{
				option: 'A',
				content: '选项一'
			}]
		};

		const sample = 'A,B,B,A';

		const result = voteResolve({}, content, sample);

		assert.deepEqual(result, {
			'A': {
				number: 1,
				content: '选项一'
			},
			'B': {
				number: 1,
				content: undefined
			}
		});
	});

	it('the option is not recorded test', function() {
		const content = {
			type: '单选',
			options: [{
				option: 'A',
				content: '选项一'
			}]
		};

		const sample = 'A';

		const result = voteResolve({}, content, sample);

		assert.deepEqual(result, {
			'A': {
				number: 1,
				content: '选项一'
			}
		});
	});

	it('the option is recorded test', function() {
		const content = {
			type: '单选',
			options: [{
				option: 'A',
				content: '选项一'
			}]
		};

		const sample = 'A';

		const result = voteResolve({
			'A': {
				number: 1,
				content: '选项一'
			}
		}, content, sample);

		assert.deepEqual(result, {
			'A': {
				number: 2,
				content: '选项一'
			}
		});
	});
});