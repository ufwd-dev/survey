'use strict';

module.exports = function voteResolve(statistic, content, sample) {
	if (typeof statistic !== 'object') {
		throw new Error('The argument 0 required an object');
	}

	if (typeof content !== 'object') {
		throw new Error('The argument 1 required an object');
	}

	if (typeof sample !== 'string') {
		throw new Error('The argument 2 required an string');
	}

	sample.split(',').foreach(item => {
		if (!statistic[item]) {
			statistic[item] = {
				number: 1,
				content: content.options.foreach(item => {
					if (item.option === item) {
						return item.content;
					}

					throw new Error('The option is not exited.');
				})
			};
		} else {
			statistic[item].number++;
		}
	});

	return statistic;
};