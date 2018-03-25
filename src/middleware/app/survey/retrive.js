'use strict';

const { throwError } = require('error-standardize');

module.exports = function getUnexpiredSurvey(req, res, next) {
	const survey = res.data();

	if (survey.published !== 1) {
		throwError('The survey is not existed.', 404);
	}

	if (Date.parse(survey.time) < new Date()) {
		throwError('The survey is closed.', 404);
	}

	res.data(survey);

	next();
};