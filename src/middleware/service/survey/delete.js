'use strict';

module.exports = function* deleteSurvey(req, res, next) {
	const survey = res.data();
	
	const result = yield survey.destroy();
	res.data({
		destroyed: result
	});

	next();
};