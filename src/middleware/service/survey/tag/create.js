'use strict';

module.exports = function* createSurveyTag(req, res, next) {
	const SurveyTag = res.sequelize.model('ufwdSurveyTag');
	const tag = req.body.tag;
	const surveyId = req.params.surveyId;

	const surveyTag = yield SurveyTag.findOrCreate({
		where: {
			surveyId, tag
		}
	});

	res.data(surveyTag);

	next();
};