'use strict';

function VoteFactory(options = [], range = '0', number = 1) {

	range === '0' ? range = '=' : undefined;

	range === '1' ? range = '>=' : undefined;

	range === '-1' ? range = '<=' : undefined;

	return new Vote(options, range, number);
}

class Vote {
	constructor(options, range, number) {
		this.range = range;
		this.number = number;
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
			
			return (item.length === this.options.length) && (this.number === 0 && length !== 0 || this.number === 1 && length === 1 ||
				this.number !== 0 && this.number !== 1 && (this.range == '<=' && length <= this.number || this.range == '=' && length === this.number ||
				this.range == '>=' && length >= this.number));
		});

		return newAnswer;

	}
}

module.exports = { VoteFactory };