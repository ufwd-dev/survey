'use strict';

const { throwError } = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getSurveyList(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');
	const SurveyTag = res.sequelize.model('ufwdSurveyTag');
	const query = {
		where: {},
		include: [{
			model: SurveyTag
		}]
	};
	const { keyword, tag, close, published } = req.query;

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	published ? (query.where.published = published) : undefined;

	close ? (query.where.time = {[Sequelize.Op.gt]: new Date(close)}) : undefined;

	tag ? (query.include[0].where = {}, query.include[0].where.tag = {[Sequelize.Op.like]: `%${tag}%`}) :undefined;

	const surveyList = yield Survey.findAll(query);

	if (surveyList.length === 0) {
		throwError('The survey is not existed', 404);
	}

	res.data(surveyList);

	next();
};