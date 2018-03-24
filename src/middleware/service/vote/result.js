'use strict';

const { throwError } = require('express-handler-loader');

module.exports = function getVoteReport(req, res, next) {
	const vote = res.data();
	
	if (!vote.statistic) {
		throwError('The sattistic of vote is not exsited.', 404);
	}

	res.data(vote.statistic);

	next();
};