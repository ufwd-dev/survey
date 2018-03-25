'use strict';

const { throwError } = require('error-standardize');
const { surveyResolve } = require('express-handler-loader')('ufwd_survey_util');

module.exports = function* getSurveySample(req, res, next) {
	const survey = res.data();
	const SurveySample = res.sequelize.model('ufwdSurveySample');
	const sample = [];

	const sampleList = yield SurveySample.findAll({
		where: {
			surveyId: survey.id
		}
	});

	if (Date.parse(survey.time) > new Date()) {
		throwError('The survey is not closed', 404);
	}

	if (sampleList.length === 0) {
		throwError('The number of sample is not enough', 404);
	}

	sampleList.forEach(item => {
		sample.push(item.answer);
	});

	const statistic = surveyResolve([], survey.content, sample);

	const result = yield survey.update({
		statistic
	});

	res.data(result.statistic);

	next();
};