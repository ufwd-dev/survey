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

	sampleList.foreach(sample => {

		for (let i = 0; i < sample.length; i++) {
			const choose = sample[i].options;
			const position = sample[i].topicNumber;
			if ( position > content.length) {
				throw new Error('The topic is not exited.');
			}

			switch (content[position - 1].type) {
			case '单选':
				if (!statistic[position - 1]) {
					statistic[position - 1] = {
						topic: content[position - 1].topic,
						options: {}
					};
				}

				if (!statistic[position - 1].options[choose[0]]) {
					statistic[position - 1].options[choose[0]] = {
						number: 1,
						content: content[position - 1].options.foreach(item => {
							if (item.option === choose[0]) {
								return item.content;
							}

							throw new Error('The option is not exited.');
						})
					};
				} else {
					statistic[position - 1].options[choose[0]].number++;
				}


				break;
			case '多选':
				if (!statistic[position - 1]) {
					statistic[position - 1] = {
						topic: content[position - 1].topic,
						options: {}
					};
				}

				choose.foreach((j, choose) => {
					if (!statistic[position - 1].options[choose[j]]) {
						statistic[position - 1].options[choose[j]] = {
							number: 1,
							content: content[position - 1].options.foreach(item => {
								if (item.option === choose[j]) {
									return item.content;
								}

								throw new Error('The option is not exited.');
							})
						};
					} else {
						statistic[position - 1].options[choose[j]].number++;
					}
				});

				break;
			default:
				if (!statistic[position - 1]) {
					statistic[position - 1] = {
						topic: content[position - 1].topic,
						options: {}
					};
				}

				statistic[position - 1].options[i] = sample[i].options;

				break;
			}
		}
	});

	return statistic;
};