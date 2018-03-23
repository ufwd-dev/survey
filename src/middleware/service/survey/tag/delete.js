'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteSurveyTag(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');
	const SurveyTag = res.sequelize.model('ufwdSurveyTag');
	const tagId = req.params.tagId;

	const surveyTag = yield SurveyTag.findOne({
		where: {
			id: tagId
		},
		include: [{
			model: Survey,
			where: {
				published: 0
			}
		}]
	});

	if (!surveyTag) {
		throwError('The surveyTag is not existed or no authority.', 404);
	}

	const result = yield surveyTag.destroy();

	res.data({
		destroy: result
	});

	next();
};