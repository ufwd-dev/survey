'use strict';

const { throwError } = require('express-handler-loader');
const { surveyResolve } = require('express-handler-loader')('ufwd_survey_util');

module.exports = function* getSurveySample(req, res, next) {
	const survey = res.data();
	const SurveySample = res.sequelize.model('ufwdSurveySample');

	const sampleList = yield SurveySample.findAll({
		where: {
			surveyId: survey.id
		}
	});

	if (Date.parse(survey.time) > new Date()) {
		throwError('The survey is not end', 404);
	}

	if (sampleList.length === 0) {
		throwError('The number of sample is not enough', 404);
	}

	const statistic = surveyResolve([], survey.content, sampleList);

	const result = yield survey.update({
		statistic
	});

	res.data(result.statistic);

	next();
};