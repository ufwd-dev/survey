'use strict';

const { throwError } = require('error-standardize');
const {Range} = require('../../../util/range');

module.exports = function* createVote(req, res, next) {
	const Vote = res.sequelize.model('ufwdVote');

	try {
		new Range(req.body.options.length, req.body.range);
	} catch (e) {
		throwError(e.message, 403);
	}

	const vote = yield Vote.create(req.body);

	res.data(vote);

	next();
};