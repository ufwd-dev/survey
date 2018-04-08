'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getSurveySample(req, res, next) {
	const survey = res.data();
	const SurveySample = res.sequelize.model('ufwdSurveySample');
	const date = new Date();

	const sampleList = yield SurveySample.findAll({
		where: {
			surveyId: survey.id
		}
	});

	if (Date.parse(survey.time) > Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())) {
		throwError('The survey is not closed', 404);
	}

	if (sampleList.length === 0) {
		throwError('The number of sample is not enough', 404);
	}

	const statistic = yield survey.getStatistic();

	yield survey.update({
		statistic
	});

	res.data({
		title: survey.title,
		content: survey.content,
		statistic
	});

	next();
};