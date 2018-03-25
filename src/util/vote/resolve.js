'use strict';

module.exports = function voteResolve(statistic, content, sample) {
	const sampleList = [];

	if (typeof statistic !== 'object') {
		throw new Error('The argument 0 required an object');
	}

	if (typeof content !== 'object') {
		throw new Error('The argument 1 required an object');
	}

	if (typeof sample !== 'string') {
		throw new Error('The argument 2 required an string');
	}

	if (!Array.isArray(content.options)) {
		throw new Error('The options of the item of argument 1 required an array');
	}

	sample = content.type === '单选' ? sample.split(',').splice(0, 1) : sample.split(',');

	sample.forEach(element => {
		if (sampleList.indexOf(element) === -1) {
			sampleList.push(element);
		}
	});
	
	sampleList.forEach(item => {
		if (!statistic[item]) {
			const option = content.options.find(cotentItem => {
				return cotentItem.option === item;
			});

			statistic[item] = {
				number: 1,
				content: option ? option.content : undefined
			};
		} else {
			statistic[item].number++;
		}
	});

	return statistic;
};