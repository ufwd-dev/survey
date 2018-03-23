'use strict';

module.exports = function* deleteVote(req, res, next) {
	const vote = res.data();
	
	const result = yield vote.destroy();
	res.data({
		destroyed: result
	});

	next();
};