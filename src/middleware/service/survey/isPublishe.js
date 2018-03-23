'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function* isSurveyPublished(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');
	const surveyId = req.params.surveyId;

	const survey = yield Survey.findOne({
		where: {
			id: surveyId,
			published: 0
		}
	});

	if (survey) {
		throwError('The survey is not existed or no authority.', 404);
	}

	res.data(survey);

	next();
};