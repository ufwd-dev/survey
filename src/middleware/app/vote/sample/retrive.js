'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function* getOwnVoteSample(req, res, next) {
	const voteId = req.params.voteId;
	const accountId = req.session.accountId;
	const VoteSample = res.sequelize.model('ufwdVoteSample');

	const voteSample = yield VoteSample.findOne({
		where: {
			voteId, accountId
		}
	});

	if (!voteSample) {
		throwError('The sample is not existed', 404);
	}

	res.data(voteSample);

	next();
};