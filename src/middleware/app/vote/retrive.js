'use strict';

const { throwError } = require('error-standardize');

module.exports = function getUnexpiredVote(req, res, next) {
	const vote = res.data();

	if (vote.published !== true) {
		throwError('The vote is not existed.', 404);
	}
	
	if (Date.parse(vote.time) < Date.parse(new Date())) {
		throwError('The vote is closed.', 404);
	}

	res.data(vote);

	next();
};