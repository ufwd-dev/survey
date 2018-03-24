'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function isSurveyPublished(req, res, next) {
	const survey = res.data();

	if (survey.published !== 0) {
		throwError('You have no authority to operate this survey.', 404);
	}

	res.data(survey);

	next();
};