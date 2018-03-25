'use strict';

const { throwError } = require('error-standardize');

module.exports = function* getOwnVoteSample(req, res, next) {
	const voteId = req.params.voteId;
	const accountId = req.session.accountId;
	const VoteSample = res.sequelize.model('ufwdVoteSample');
	const Vote = res.sequelize.model('ufwdVote');

	const voteSample = yield VoteSample.findOne({
		where: {
			voteId, accountId
		},
		include: [{
			model: Vote
		}]
	});

	if (!voteSample) {
		throwError('The sample is not existed', 404);
	}

	res.data(voteSample);

	next();
};