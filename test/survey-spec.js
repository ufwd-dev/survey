'use strict';

const {SurveyFactory, SurveyItem} = require('../src/util/survey/resolve');

const {Range} = require('../src/util/range');

const assert = require('assert');

describe('survey test', function () {

	it('product a survey object', function () {
		const content = [{
			question: 'question1',
			options: ['options1', 'options2', 'options3', 'options4'],
			range: '1, 2'
		}, {
			question: 'question2',
			options: ['options1', 'options2', 'options3', 'options4'],
		}];
		const survey = SurveyFactory(content);

		assert.deepEqual(survey, {
			itemList: [{
				options: ['options1', 'options2', 'options3', 'options4'],
				range: {
					from: 1,
					to: 2
				}
			}, {
				options: ['options1', 'options2', 'options3', 'options4'],
				range: {
					from: 1,
					to: 1
				}
			}]
		});
	});

	describe('class SurveyItem test', function () {

		const ownItem = new SurveyItem([1,2,3], new Range(3, '2, 3'));

		describe('method validate test', function () {

			it('argument is not an array', function () {
				try {
					ownItem.validate('12');
				} catch (e) {
					assert.equal(e.message, 'The argument 0 should be an array.');
				}
				
			});

			it('the length of argument is 0', function () {
				const result = ownItem.validate([]);

				assert.equal(result, false);
			});

			it('the item of argument should be an array', function () {
				try {
					ownItem.validate([1, 2, 3]);
				} catch (e) {
					assert.equal(e.message, 'The item of argument 0 should be an array.');
				}
			});

		});

		describe('method filter test' ,function () {

			it('the length of item is not equal with the length of options', function () {
				const beforeFilter = [[1,0], [1,1,0], [1,0,1,0,1], [1, 1, 1]];
				const list = ownItem.filter(beforeFilter);

				assert.equal(list.length, 2);
			});

			it('the number of choose is not equal the number of optional', function () {
				const beforeFilter = [[1, 0, 0], [0, 0, 0], [1, 1, 0], [1, 0, 0]];
				const list = ownItem.filter(beforeFilter);

				assert.equal(list.length, 1);
			});
		});

		it('method analyze test', function () {
			const beforeFilter = [[1,0], [1,1,0], [1,0,1,0,1], [1, 1, 1], [1, 0, 0], [0, 0, 0], [1, 1, 0], [1, 0, 0]];
			const list = ownItem.analyze(beforeFilter);

			assert.deepEqual(list, [3, 3, 1]);

			const anotherList = [[1,1,0], [1, 1, 1], [1, 0, 0], [1, 2, 1], [1, 1, 0], [1, 3, 'lu']];
			const result = ownItem.analyze(anotherList);

			assert.deepEqual(result, [4, 3, 2]);
		});
	});

	describe('class survey test', function () {

		const content = [{
			question: 'question1',
			options: ['options1', 'options2', 'options3', 'options4'],
			range: '1'
		}, {
			question: 'question2',
			options: ['options1', 'options2', 'options3', 'options4'],
		}];
		const survey = SurveyFactory(content);

		describe('The method validate test', function () {

			it('The argument 1 is not an array', function () {
				try {
					survey.validate(1);
				} catch (e) {
					assert.equal(e.message, 'The argument should be an array.');
				}
			});

			it('The item of argument 1 is not an array', function () {
				try {
					survey.validate([1]);
				} catch (e) {
					assert.equal(e.message, 'The item of argument should be an array.');
				}
			});

			it('The item of the item of argument 1 is not an array', function () {
				try {
					survey.validate([[1]]);
				} catch (e) {
					assert.equal(e.message, 'The item of the item ofargument should be an array.');
				}
			});
		});
		
		describe('The method filter test', function () {

			it('The sample length is not equal with the survey length', function () {
				const sampleList = survey.filter([[1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [3, 4, 5]]);

				assert.equal(sampleList.length, 1);
			});
		});

		describe('The method analyze test', function () {

			it('The complete analyze test', function () {
				const sampleList = [[[1, 0, 0, 0]], [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0]],
					[[1, 0, 1, 0],[1, 0, 0, 0]], [[1, 0, 0, 0],[0, 1, 0, 0]], [[1, 2, 3, 4],[0, 1, 1, 0]],
					[[0, 1, 0, 0],[0, 0, 0, 1]]];
				const statistic = survey.analyze(sampleList);

				assert.deepEqual(statistic, [[2, 1, 0, 0],[1, 1, 0, 1]]);
			});
		});

	});

});