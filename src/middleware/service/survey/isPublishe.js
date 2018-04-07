'use strict';

const { throwError } = require('error-standardize');

module.exports = function isSurveyPublished(req, res, next) {
	const survey = res.data();

	if (survey.published !== false) {
		throwError('You have no authority to operate this survey.', 404);
	}

	res.data(survey);

	next();
};