'use strict';

const {Range} = require('../range');

function VoteFactory(range, options) {

	const rangeObject = new Range(options.length, range);

	return new Vote(options, rangeObject);
}

class Vote {
	constructor(options, range) {
		this.range = range;
		this.options = options;
	}

	analyze(sampleList = []) {
		this.validate(sampleList);
		
		const newList = this.filter(sampleList);

		let statistic = new Array(this.options.length).fill(0);

		newList.forEach(sample => {
			statistic = statistic.map((item,index) => {
				if (sample[index] === 0 || sample[index] === 1) {

					item = item + sample[index];
				}

				return item;
			});
		});

		return statistic;
	}

	validate(answer) {

		if (!Array.isArray(answer)) {
			throw new Error('The argument 0 should be an array.');
		}

		if (answer.length === 0) {
			return false;
		}

		answer.forEach(item => {
			if (!Array.isArray(item)) {
				throw new Error('The item of argument 0 should be an array.');
			}
		});
	}

	filter(answer) {

		const newAnswer = answer.filter(item => {
	
			const length = item.filter(element => {
				return element === 1;
			}).length;
			
			return this.range.validateSample(length)  && item.length === this.options.length;
		});

		return newAnswer;

	}
}

module.exports = { VoteFactory };