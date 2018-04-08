'use strict';

const { throwError } = require('error-standardize');

module.exports = function getUnexpiredSurvey(req, res, next) {
	const survey = res.data();
	const date = new Date();

	if (survey.published !== true) {
		throwError('The survey is not existed.', 404);
	}

	if (Date.parse(survey.time) < Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())) {
		throwError('The survey is closed.', 404);
	}

	res.data(survey);

	next();
};