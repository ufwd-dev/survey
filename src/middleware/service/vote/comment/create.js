'use strict';

const { throwError } = require('error-standardize');

module.exports = function* createComment(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const voteId = req.params.voteId;

	const vote = yield Vote.findOne({
		where: {
			id: voteId,
			published: 1
		}
	});

	if (!vote) {
		throwError('The vote is not existed', 404);
	}

	const result = yield vote.update(req.body);

	res.data(result);

	next();
};