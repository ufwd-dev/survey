'use strict';

const surveyResolve = require('../src/util/survey/resolve');

const assert = require('assert');

describe('surveyResolve test', function() {

	it('argument 0 is not an array test', function() {
		try {
			surveyResolve(1, [], []);
		} catch (error) {
			assert.equal(error.message, 'The argument 0 required an array');
		}
	});

	it('argument 1 is not an array test', function() {
		try {
			surveyResolve([], 1, []);
		} catch (error) {
			assert.equal(error.message, 'The argument 1 required an array');
		}
	});

	it('argument 2 is not an array test', function() {
		try {
			surveyResolve([], [], 1);
		} catch (error) {
			assert.equal(error.message, 'The argument 2 required an array');
		}
	});

	describe('sampleList tranverse', function() {

		it('sample is not an object test', function() {
			try {
				surveyResolve([], [], [1,2,3]);
			} catch (error) {
				assert.equal(error.message, 'The item of sampleList required an array');
			}
		});

		it('topicNumber of sample is not a number test', function() {
			try {
				surveyResolve([], [], [[{topicNumber: '123'}]]);
			} catch (error) {
				assert.equal(error.message, 'The topicNumber of sample required a number');
			}
		});

		it('options of sample is not an array test', function() {
			try {
				surveyResolve([], [], [[{topicNumber: 1, options: '123'}]]);
			} catch (error) {
				assert.equal(error.message, 'The options of sample should be an array');
			}
		});

		it('topic is not existed test', function() {
			const content = [{}, {}, {}];
			const sampleList = [[
				{'topicNumber': 4, 'options': ['A']}, {'topicNumber': 2, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			]];

			try {
				surveyResolve([], content, sampleList);
			} catch (error) {
				assert.equal(error.message, 'The topic is not exited');
			}

		});

		it('item of argument 1 is not an object test', function() {
			const content = [1, 2, 3];
			const sampleList = [[
				{'topicNumber': 1, 'options': ['A']}, {'topicNumber': 2, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			]];

			try {
				surveyResolve([], content, sampleList);
			} catch (error) {
				assert.equal(error.message, 'The item of argument 1 required an object');
			}
		});

		it('options of item of argument 1 is not an array test', function() {
			const content = [{}, {}, {}];
			const sampleList = [[
				{'topicNumber': 1, 'options': ['A']}, {'topicNumber': 2, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}
			], [
				{'topicNumber': 2, 'options': ['A']}, {'topicNumber': 3, 'options': ['A']}, {'topicNumber': 4, 'options': ['A']}
			]];

			try {
				surveyResolve([], content, sampleList);
			} catch (error) {
				assert.equal(error.message, 'The options of the item of argument 1 required an array');
			}
		});
	
		describe('radio test', function() {

			it('the topic is not recorded test', function() {
				const content = [{
					type: '单选',
					options: [{}, {}, {}]
				}];
				const sampleList = [[
					{ 'topicNumber': 1, 'options': []}
				]];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result[0], {
					topic: undefined,
					options: {}
				});
				
			});
	
			describe('the option is not recorded test', function() {

				it('the option is exited', function () {
					const content = [{
						topic: '爱好',
						type: '单选',
						options: [{
							option: 'A',
							content: '选项一内容'
						}, {
							option: 'B',
							content: '选项二内容'
						}, {
							option: 'C',
							content: '选项三内容'
						}]
					}];
					const sampleList = [[
						{ 'topicNumber': 1, 'options': ['A']}
					]];
	
					const result = surveyResolve([], content, sampleList);
	
					assert.deepEqual(result[0], {
						topic: '爱好',
						options: {
							'A': {
								number: 1,
								content: '选项一内容'
							}
						}
					});
				});

				it('the option is not exited', function () {
					const content = [{
						topic: '爱好',
						type: '单选',
						options: [{
							option: 'A',
							content: '选项一内容'
						}, {
							option: 'B',
							content: '选项二内容'
						}, {
							option: 'C',
							content: '选项三内容'
						}]
					}];
					const sampleList = [[
						{ 'topicNumber': 1, 'options': ['D']}
					]];
	
					const result = surveyResolve([], content, sampleList);
	
					assert.deepEqual(result[0], {
						topic: '爱好',
						options: {
							'D': {
								number: 1,
								content: undefined
							}
						}
					});
				});
			});
	
			it('the option is recorded test', function() {
				const content = [{
					topic: '爱好',
					type: '单选',
					options: [{
						option: 'A',
						content: '选项一内容'
					}, {
						option: 'B',
						content: '选项二内容'
					}, {
						option: 'C',
						content: '选项三内容'
					}]
				}];
				const sampleList = [[
					{ 'topicNumber': 1, 'options': ['A', 'B']}
				],[
					{ 'topicNumber': 1, 'options': ['A', 'B']}
				]];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result[0], {
					topic: '爱好',
					options: {
						'A': {
							number: 2,
							content: '选项一内容'
						}
					}
				});
			});
		});
	
		describe('multi-select test', function() {
			it('the topic is not recorded test', function() {
				const content = [{
					topic: '擅长',
					type: '多选',
					options: [{}, {}, {}]
				}];
				const sampleList = [[
					{ 'topicNumber': 1, 'options': []}
				]];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result[0], {
					topic: '擅长',
					options: {}
				});
			});
	
			describe('the option is not recorded test', function() {
				it('the option is exited', function () {
					const content = [{
						topic: '擅长',
						type: '多选',
						options: [{
							option: 'A',
							content: '选项一内容'
						}, {
							option: 'B',
							content: '选项二内容'
						}, {
							option: 'C',
							content: '选项三内容'
						}]
					}];
					const sampleList = [
						[{ 'topicNumber': 1, 'options': ['A', 'B']}],
						[{ 'topicNumber': 1, 'options': ['A', 'B']}]
					];
	
					const result = surveyResolve([], content, sampleList);
	
					assert.deepEqual(result[0], {
						topic: '擅长',
						options: {
							'A': {
								number: 2,
								content: '选项一内容'
							},
							'B': {
								number: 2,
								content: '选项二内容'
							}
						}
					});
				});

				it('the option is not exited', function () {
					const content = [{
						type: '多选',
						options: [{
							option: 'A',
							content: '选项一内容'
						}, {
							option: 'B',
							content: '选项二内容'
						}, {
							option: 'C',
							content: '选项三内容'
						}]
					}];
					const sampleList = [[
						{ 'topicNumber': 1, 'options': ['D', 'C']}
					]];
	
					const result = surveyResolve([], content, sampleList);
	
					assert.deepEqual(result[0], {
						topic: undefined,
						options: {
							'D': {
								number: 1,
								content: undefined
							},
							'C': {
								number: 1,
								content: '选项三内容'
							}
						}
					});
				});
			});
	
			it('the option is recorded test', function() {
				const content = [{
					type: '多选',
					options: [{
						option: 'A',
						content: '选项一内容'
					}, {
						option: 'B',
						content: '选项二内容'
					}, {
						option: 'C',
						content: '选项三内容'
					}]
				}];
				const sampleList = [[
					{ 'topicNumber': 1, 'options': ['A', 'B']}
				],[
					{ 'topicNumber': 1, 'options': ['A', 'C']}
				]];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result[0], {
					topic: undefined,
					options: {
						'A': {
							number: 2,
							content: '选项一内容'
						},
						'B': {
							number: 1,
							content: '选项二内容'
						},
						'C': {
							number: 1,
							content: '选项三内容'
						}
					}
				});
			});
		});
	
		describe('default test', function() {
			it('the topic is not recorded test', function() {
				const content = [{
					topic: '建国日期',
					type: '填空',
					options: [{}]
				},{
					topic: '国庆日期',
					type: '填空',
					options: [{}]
				}];
				const sampleList = [
					[{ 'topicNumber': 1, 'options': ['1949']}, { 'topicNumber': 2, 'options': ['1949']}],
				];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result,[{
					topic: '建国日期',
					options: ['1949']
				},{
					topic: '国庆日期',
					options: ['1949']
				}]);
			});
	
			it('the topic is recorded test', function() {
				const content = [{
					topic: '建国日期',
					type: '填空',
					options: [{}]
				},{
					topic: '国庆日期',
					type: '填空',
					options: [{}]
				}];
				const sampleList = [
					[{ 'topicNumber': 1, 'options': ['1949']}, { 'topicNumber': 2, 'options': ['1949']}],
					[{ 'topicNumber': 1, 'options': ['1950']}, { 'topicNumber': 2, 'options': ['1949']}],
					[{ 'topicNumber': 1, 'options': ['1960']}, { 'topicNumber': 2, 'options': ['1949']}]
				];

				const result = surveyResolve([], content, sampleList);

				assert.deepEqual(result,[{
					topic: '建国日期',
					options: ['1949', '1950', '1960']
				},{
					topic: '国庆日期',
					options: ['1949', '1949', '1949']
				}]);
			});
		});

		describe('comprehensive test', function() {
			const content = [{
				topic: '建国日期',
				type: '填空',
				options: [{}]
			},{
				topic: '国庆日期',
				type: '填空',
				options: [{}]
			},{
				type: '多选',
				options: [{
					option: 'A',
					content: '选项一内容'
				}, {
					option: 'B',
					content: '选项二内容'
				}, {
					option: 'C',
					content: '选项三内容'
				}]},
			{
				topic: '爱好',
				type: '单选',
				options: [{
					option: 'A',
					content: '选项一内容'
				}, {
					option: 'B',
					content: '选项二内容'
				}, {
					option: 'C',
					content: '选项三内容'
				}]
			}];
			const sampleList = [
				[{ 'topicNumber': 1, 'options': ['1949']}, { 'topicNumber': 2, 'options': ['1949']}, { 'topicNumber': 3, 'options': ['A', 'C']}, { 'topicNumber': 4, 'options': ['A']}],
				[{ 'topicNumber': 1, 'options': ['1950']}, { 'topicNumber': 2, 'options': ['1949']}, { 'topicNumber': 3, 'options': ['B', 'C']}, { 'topicNumber': 4, 'options': ['B']}],
				[{ 'topicNumber': 1, 'options': ['1960']}, { 'topicNumber': 2, 'options': ['1949']}, { 'topicNumber': 3, 'options': ['D', 'C']}, { 'topicNumber': 4, 'options': ['C']}]
			];

			const result = surveyResolve([], content, sampleList);
			console.log(result);
			assert.deepEqual(result, [{
				topic: '建国日期',
				options: ['1949', '1950', '1960']
			},{
				topic: '国庆日期',
				options: ['1949', '1949', '1949']
			},{
				topic: undefined,
				options: {
					'A': {
						number: 1,
						content: '选项一内容'
					},
					'B': {
						number: 1,
						content: '选项二内容'
					},
					'C': {
						number: 3,
						content: '选项三内容'
					},
					'D': {
						number: 1,
						content: undefined
					}
				}
			},{
				topic: '爱好',
				options: {
					'A': {
						number: 1,
						content: '选项一内容'
					},
					'B': {
						number: 1,
						content: '选项二内容'
					},
					'C': {
						number: 1,
						content: '选项三内容'
					}
				}
			}]);
		});
	});
});