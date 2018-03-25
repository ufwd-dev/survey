'use strict';

const { throwError } = require('error-standardize');

module.exports = function isVotePublished(req, res, next) {
	const vote = res.data();

	if (vote.published !== 0) {
		throwError('You have no authority to operate this vote.', 404);
	}

	res.data(vote);

	next();
};