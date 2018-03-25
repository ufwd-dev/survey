'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getVote(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const VoteTag = res.sequelize.model('ufwdVoteTag');
	const voteId = req.params.voteId;

	const vote = yield Vote.findOne({
		where: {
			id: voteId
		},
		include: [{
			model: VoteTag
		}]
	});

	if (!vote) {
		throwError('The vote is not existed', 404);
	}

	res.data(vote);

	next();
};