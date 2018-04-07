'use strict';

const {throwError} = require('error-standardize');

module.exports = function* deleteVoteTag(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');
	const VoteTag = res.sequelize.model('ufwdVoteTag');
	const tagId = req.params.tagId;

	const voteTag = yield VoteTag.findOne({
		where: {
			id: tagId
		},
		include: [{
			model: Vote,
			where: {
				published: false
			}
		}]
	});

	if (!voteTag) {
		throwError('The voteTag is not existed or no authority.', 404);
	}

	const result = yield voteTag.destroy();

	res.data({
		destroy: result
	});

	next();
};