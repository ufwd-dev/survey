'use strict';

const { throwError } = require('error-standardize');
const { voteResolve } = require('express-handler-loader')('ufwd_survey_util');

module.exports = function* createVoteSample(req, res, next) {
	const  VoteSample = res.sequelize.model('ufwdVoteSample');
	const  Vote = res.sequelize.model('ufwdVote');
	const voteId = req.params.voteId;
	const accountId = req.session.accountId;

	const vote = yield Vote.findOne({
		where: {
			id: voteId,
			published: 1
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

	if (Date.parse(vote.time) < new Date()) {
		throwError('The vote is closed.', 404);
	}

	if (sample) {
		throwError('You have post to this vote.', 404);
	}


	const voteSample = yield VoteSample.create({
		accountId, voteId,
		answer: req.body.answer
	});

	vote.statistic ? undefined : vote.statistic = {};

	const statistic = voteResolve(vote.statistic, vote.content, req.body.answer);

	const result = yield vote.update({
		count: vote.count + 1,
		statistic
	});

	res.data({
		topic: result.topic,
		statistic,
		count: result.count,
		ownSample: voteSample
	});

	next();
};