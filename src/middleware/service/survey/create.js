'use strict';

const { throwError } = require('error-standardize');
const {Range} = require('../../../util/range');

module.exports = function* createSurvey(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');

	req.body.content.forEach(item => {
		try {
			new Range(item.options.length, item.range);
		} catch (e) {
			throwError(e.message, 403);
		}
	});

	const survey = yield Survey.create(req.body);

	res.data(survey);

	next();
};