'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getSurvey(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');
	const SurveyTag = res.sequelize.model('ufwdSurveyTag');
	const surveyId = req.params.surveyId;

	const survey = yield Survey.findOne({
		where: {
			id: surveyId
		},
		include: [{
			model: SurveyTag
		}]
	});

	if (!survey) {
		throwError('The survey is not existed', 404);
	}

	res.data(survey);

	next();
};