'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function* createVoteSample(req, res, next) {
	const  VoteSample = res.sequelize.model('ufwdVoteSample');
	const  Vote = res.sequelize.model('ufwdVote');
	const voteId = req.params.voteId;
	const accountId = req.session.accountId;

	const vote = yield Vote.findOne({
		where: {
			id: voteId
		}
	});

	const sample = yield VoteSample.findOne({
		where: {
			voteId, accountId
		}
	});

	if (!vote) {
		throwError('The vote is not existed.', 404);
	}

	if (!sample) {
		throwError('You have post to this survey..', 404);
	}

	const voteSample = yield VoteSample.create({
		accountId, vote,
		answer: req.body.answer
	});

	res.data(voteSample);

	next();
};