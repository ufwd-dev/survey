'use strict';

const { throwError } = require('error-standardize');

module.exports = function* createSurveySample(req, res, next) {
	const SurveySample = res.sequelize.model('ufwdSurveySample');
	const Survey = res.sequelize.model('ufwdSurvey');
	const surveyId = req.params.surveyId;
	const accountId = req.session.accountId;
	const date = new Date();

	const survey = yield Survey.findOne({
		where: {
			id: surveyId,
			published: true
		}
	});

	const sample = yield SurveySample.findOne({
		where: {
			surveyId, accountId
		}
	});

	if (!survey) {
		throwError('The survey is not existed.', 404);
	}

	if (Date.parse(survey.time) < Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())) {
		throwError('The survey is closed.', 404);
	}

	if (sample) {
		throwError('You have post to this survey.', 404);
	}

	const surveySample = yield SurveySample.create({
		accountId, surveyId,
		answer: req.body.answer
	});

	res.data(surveySample);

	next();
};