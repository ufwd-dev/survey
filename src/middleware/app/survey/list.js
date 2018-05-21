'use strict';

const { throwError } = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getOwnSurveyList(req, res, next) {
	const Survey = res.sequelize.model('ufwdSurvey');
	const SurveyTag = res.sequelize.model('ufwdSurveyTag');
	const query = {
		where: {
			published: true
		},
		include: [{
			model: SurveyTag
		}]
	};
	const { keyword, tag, close } = req.query;

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	close ? (query.where.time = {[Sequelize.Op.gt]: new Date(close)}) : undefined;

	tag ? (query.include[0].where = {}, query.include[0].where.tag = {[Sequelize.Op.like]: `%${tag}%`}) :undefined;

	const surveyList = yield Survey.findAll(query);

	res.data(surveyList);

	next();
};