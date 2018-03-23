'use strict';

module.exports = function* createVote(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');

	const vote = yield Vote.create(req.body);

	res.data(vote);

	next();
};