'use strict';

const { throwError } = require('error-standardize');

module.exports = function getUnexpiredVote(req, res, next) {
	const vote = res.data();
	const date = new Date();

	if (vote.published !== true) {
		throwError('The vote is not existed.', 404);
	}
	
	if (Date.parse(vote.time) < Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())) {
		throwError('The vote is closed.', 404);
	}

	res.data(vote);

	next();
};