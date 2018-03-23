'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function* isVotePublished(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const voteId = req.params.voteId;

	const vote = yield Vote.findOne({
		where: {
			id: voteId,
			published: 0
		}
	});

	if (vote) {
		throwError('The vote is not existed', 404);
	}

	res.data(vote);

	next();
};