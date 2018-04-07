'use strict';

const {Range} = require('../range');

function SurveyFactory(content) {

	const itemList = [];

	content.forEach(item => {
		const range = new Range(item.options.length, item.range);

		itemList.push(new SurveyItem(item.options, range));
	});

	return new Survey(itemList);
}

class Survey {
	constructor(itemList) {
		this.itemList = itemList;
	}

	analyze(surveySampleList) {
		this.validate(surveySampleList);

		const newSurveySampleList = this.filter(surveySampleList);
		const sampleList = new Array(this.itemList.length).fill(new Array());
		const statistic = [];
	
		sampleList.forEach((itemSampleList, i, sampleList) => {

			const container = [];

			newSurveySampleList.forEach(sample => {
				container.push(sample[i]);

				sampleList[i] = container;
			});

			statistic.push(this.itemList[i].analyze(sampleList[i]));
		});

		return statistic;
	}

	filter(surveySampleList) {
		return surveySampleList.filter(sample => {
			return this.itemList.length === sample.length;
		});
	}

	validate(surveySampleList) {

		if (!Array.isArray(surveySampleList)) {
			throw new Error('The argument should be an array.');
		}
	
		surveySampleList.forEach(surveySample => {
	
			if (!Array.isArray(surveySample)) {
				throw new Error('The item of argument should be an array.');
			}

			surveySample.forEach(item => {
				if (!Array.isArray(item)) {
					throw new Error('The item of the item ofargument should be an array.');
				}
			});
		});
	}
}

class SurveyItem {
	constructor(options, range) {
		this.options = options;
		this.range = range;
	}

	analyze(itemSampleList) {
		this.validate(itemSampleList);
		
		const newItemSampleList = this.filter(itemSampleList);

		let statistic = new Array(this.options.length).fill(0);

		newItemSampleList.forEach(sample => {
			statistic = statistic.map((item,index) => {
				if (sample[index] === 0 || sample[index] === 1) {

					item = item + sample[index];
				}

				return item;
			});
		});

		return statistic;
	}

	validate(itemSampleList) {
		if (!Array.isArray(itemSampleList)) {
			throw new Error('The argument 0 should be an array.');
		}

		if (itemSampleList.length === 0) {
			return false;
		}

		itemSampleList.forEach(item => {
			if (!Array.isArray(item)) {
				throw new Error('The item of argument 0 should be an array.');
			}
		});
	}

	filter(itemSampleList) {
		const newItemSampleList = itemSampleList.filter(item => {
	
			const length = item.filter(element => {
				return element === 1;
			}).length;
			
			return this.range.validateSample(length) && item.length === this.options.length;

		});

		return newItemSampleList;

	}
}

module.exports = { SurveyFactory, SurveyItem };
