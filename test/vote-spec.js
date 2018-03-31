'use strict';

const {VoteFactory} = require('../src/util/vote/resolve');

const assert = require('assert');

describe('vote test', function () {

	describe('VoteFactory test', function () {

		it('product a vote object', function () {
			const vote = VoteFactory();

			assert.deepEqual(vote, {
				range: '=',
				number: 1,
				options: []
			});
		});
		
		describe('class Vote test', function () {
	
			describe('method validate test', function () {
	
				it('argument is not an array', function () {
					const vote = VoteFactory();
	
					try {
						vote.validate('1');
					} catch (e) {
						assert.equal(e.message, 'The argument 0 should be an array.');
					}
				});
	
				it('the length of argument is 0', function () {
					const vote = VoteFactory();
	
					assert.equal(false, vote.validate([]));
				});
	
				it('the item of argument should be an array', function () {
					const vote = VoteFactory();
	
					try {
						vote.validate([1, 2, 3]);
					} catch (e) {
						assert.equal(e.message, 'The item of argument 0 should be an array.');
					}
				});
	
			});

			describe('method filter test' ,function () {

				it('the length of item is not equal with the length of options', function () {
					const vote = VoteFactory([1,2,3], '0', 1);
					const sampleList = [[0, 0, 1], [1], [0, 1], [1, 0, 0, 0], [1,1,1,1,1]];

					const newList = vote.filter(sampleList);
					assert.equal(newList.length, 1);
				});
	
				it('the number of choose is not equal the number of optional', function () {
					const vote = VoteFactory([1,2,3], '0', 2);
	
					const sampleList = [[0, 0, 1], [1, 1, 1], [0, 1, 1], [1, 1, 0], [1, 1, 1]];

					const newList = vote.filter(sampleList);
					assert.equal(newList.length, 2);
				});
			});
	
			it('method analyze test', function () {
				const vote = VoteFactory(['question1', 'question2', 'question3'], '1', 1);
				const sampleList = [[0, 1, 0], [1, 0, 0], [0, 1, 0], [0, 1, 0]];

				const statistic = vote.analyze(sampleList);

				assert.deepEqual(statistic, [1, 3, 0]);

				const anotherList = [[1,0,0], [0, 0, 1], [1, 0, 0], [1, 2, 0], [0, 1, 0], [1, 3, 'lu']];
				const result = vote.analyze(anotherList);

				assert.deepEqual(result, [4, 1, 1]);
			});
		});
	});
});