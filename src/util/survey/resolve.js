'use strict';

module.exports = function surveyResolve(statistic, content, sampleList) {
	if (!Array.isArray(statistic)) {
		throw new Error('The argument 0 required an array');
	}

	if (!Array.isArray(content)) {
		throw new Error('The argument 1 required an array');
	}

	if (!Array.isArray(sampleList)) {
		throw new Error('The argument 2 required an array');
	}

	sampleList.forEach(sample => {

		if (!Array.isArray(sample)) {
			throw new Error('The item of sampleList required an array');
		}

		for (let i = 0; i < sample.length; i++) {
			let choose = sample[i].options;
			const position = sample[i].topicNumber;

			if (typeof position !== 'number') {
				throw new Error('The topicNumber of sample required a number');
			}

			if (!Array.isArray(choose)) {
				throw new Error('The options of sample should be an array');
			}

			if ( position > content.length) {
				throw new Error('The topic is not exited');
			}

			
			if (typeof content[position - 1] !== 'object') {
				throw new Error('The item of argument 1 required an object');
			}

			if (!Array.isArray(content[position - 1].options)) {
				throw new Error('The options of the item of argument 1 required an array');
			}
			
			content[position - 1].type === '单选' ? choose = choose.splice(0,1) : undefined;

			switch (content[position - 1].type) {
			case '单选':
			case '多选':
				if (!statistic[position - 1]) {
					statistic[position - 1] = {
						topic: content[position - 1].topic,
						options: {}
					};
				}

				choose.forEach((item, j, choose) => {
					
					if (choose[j] && !statistic[position - 1].options[choose[j]]) {

						const option = content[position - 1].options.find(item => {
							return item.option === choose[j];
						});
						
						statistic[position - 1].options[choose[j]] = {
							number: 1,
							content: option ? option.content : undefined
						};
					} else if (statistic[position - 1].options[choose[j]]) {
						statistic[position - 1].options[choose[j]].number++;
					}
				});

				break;
			default:
				if (!statistic[position - 1]) {
					statistic[position - 1] = {
						topic: content[position - 1].topic,
						options: []
					};
				}
				statistic[position - 1].options.push(...(sample[i].options));

				break;
			}
		}
	});

	return statistic;
};