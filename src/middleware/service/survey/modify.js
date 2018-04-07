'use strict';

module.exports = function* modifySurveyTime(req, res, next) {
	const survey = res.data();

	const result = yield survey.update(req.body);

	res.data(result);

	next();
};