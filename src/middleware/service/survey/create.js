'use strict';

module.exports = function* createSurvey(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');

	const survey = yield Survey.create(req.body);

	res.data(survey);

	next();
};