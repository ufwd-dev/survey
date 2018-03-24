'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function getUnexpiredVote(req, res, next) {
	const vote = res.data();

	if (vote.published !== 1) {
		throwError('The vote is not existed.', 404);
	}
	
	if (Date.parse(vote.published) <= new Date()) {
		throwError('The vote is out of date.', 404);
	}

	res.data(vote);

	next();
};