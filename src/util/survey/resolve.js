'use strict';

function SurveyFactory(content) {

	const survey = [];

	content.forEach(item => {
		item.range === '0' ? item.range = '=' : undefined;

		item.range === '1' ? item.range = '>=' : undefined;

		item.range === '-1' ? item.range = '<=' : undefined;

		survey.push(SurveyItemFactory(item.options, item.range, item.number));
	});

	return new Survey(survey);
}

function SurveyItemFactory(options = [], range = '=', number = 1) {

	return new SurveyItem(options, range, number);
}

class Survey {
	constructor(itemList) {
		this.survey = itemList;
	}

	analyze(surveySampleList) {
		this.validate(surveySampleList);

		const newSurveySampleList = this.filter(surveySampleList);
		const sampleList = new Array(this.survey.length).fill(new Array());
		const statistic = [];
	
		sampleList.forEach((itemSampleList, i, sampleList) => {

			const container = [];

			newSurveySampleList.forEach(sample => {
				container.push(sample[i]);

				sampleList[i] = container;
			});

			statistic.push(this.survey[i].analyze(sampleList[i]));
		});

		return statistic;
	}

	filter(surveySampleList) {
		return surveySampleList.filter(sample => {
			return this.survey.length === sample.length;
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
	constructor(options, range, number) {
		this.options = options;
		this.range = range;
		this.number = number;
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
			
			return (item.length === this.options.length) && (this.number === 0 && length !== 0 || this.number === 1 && length === 1 ||
				this.number !== 0 && this.number !== 1 && (this.range == '<=' && length <= this.number || this.range == '=' && length === this.number ||
				this.range == '>=' && length >= this.number));

				
		});

		return newItemSampleList;

	}
}

module.exports = { SurveyFactory, SurveyItemFactory };
