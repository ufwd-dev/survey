'use strict';

const { throwError } = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getVoteList(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const VoteTag = res.sequelize.model('ufwdVoteTag');
	const query = {
		where: {},
		include: [{
			model: VoteTag
		}]
	};
	const { keyword, tag, close, published } = req.query;

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	published ? (query.where.published = published) : undefined;

	close ? (query.where.time = {[Sequelize.Op.gt]: new Date(close)}) : undefined;

	tag ? (query.include[0].where = {}, query.include[0].where.tag = {[Sequelize.Op.like]: `%${tag}%`}) :undefined;

	const voteList = yield Vote.findAll(query);

	if (voteList.length === 0) {
		throwError('The vote is not existed', 404);
	}

	res.data(voteList);

	next();
};