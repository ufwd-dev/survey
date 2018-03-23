'use strict';

module.exports = function* updateVote(req, res, next) {
	const vote = res.data();

	const result = yield vote.update(req.body);

	res.data(result);

	next();
};