'use strict';

module.exports = function* modifyVoteTime(req, res, next) {
	const vote = res.data();

	const result = yield vote.update(req.body);

	res.data(result);

	next();
};