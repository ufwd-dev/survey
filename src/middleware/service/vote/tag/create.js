'use strict';

module.exports = function* createVoteTag(req, res, next) {
	const VoteTag = res.sequelize.model('ufwdVoteTag');
	const tag = req.body.tag;
	const voteId = req.params.voteId;

	const voteTag = yield VoteTag.findOrCreate({
		where: {
			voteId, tag
		}
	});

	res.data(voteTag);

	next();
};