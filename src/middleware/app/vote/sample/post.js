'use strict';

const { throwError } = require('error-standardize');

module.exports = function* createVoteSample(req, res, next) {
	const  VoteSample = res.sequelize.model('ufwdVoteSample');
	const  Vote = res.sequelize.model('ufwdVote');
	const voteId = req.params.voteId;
	const accountId = req.session.accountId;
	const date = new Date();

	const vote = yield Vote.findOne({
		where: {
			id: voteId,
			published: true
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
	
	if (Date.parse(vote.time) < Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())) {
		throwError('The vote is closed.', 404);
	}

	

	if (sample) {
		throwError('You have post to this vote.', 404);
	}


	const voteSample = yield VoteSample.create({
		accountId, voteId,
		answer: req.body.answer
	});

	const result = yield vote.update({
		count: vote.count + 1,
	});

	const statistic = yield vote.getVoteStatistic();

	res.data({
		options: vote.options,
		count: result.count,
		statistic,
		sample: voteSample.answer
	});

	next();
};