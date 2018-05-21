'use strict';

const { throwError } = require('error-standardize');
const Sequelize = require('sequelize');

module.exports = function* getOwnVoteList(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const VoteTag = res.sequelize.model('ufwdVoteTag');
	const VoteSample = res.sequelize.model('ufwdVoteSample');
	const accountId = req.session.accountId;
	const query = {
		where: {
			published: true
		},
		include: [{
			model: VoteTag
		}]
	};
	const { keyword, tag, close, self } = req.query;

	keyword ? (query.where.title = {[Sequelize.Op.like]: `%${keyword}%`}) : undefined;

	self === 'true' ? (query.include[1] = {model: VoteSample, where: {accountId}}) : undefined;

	close ? (query.where.time = {[Sequelize.Op.gt]: new Date(close)}) : undefined;

	tag ? (query.include[0].where = {}, query.include[0].where.tag = {[Sequelize.Op.like]: `%${tag}%`}) :undefined;

	const voteList = yield Vote.findAll(query);

	res.data(voteList);

	next();
};