'use strict';

module.exports = function* getVoteReport(req, res, next) {
	const vote = res.data();
	
	const statistic = yield vote.getVoteStatistic();

	res.data({
		title: vote.title,
		question: vote.question,
		options: vote.options,
		statistic
	});

	next();
};