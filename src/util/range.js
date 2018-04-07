'use strict';

const RANGE_RESOLVER = [
	{
		regular: /^(\d)$/,
		resolve(exp) {

			const [_, value] = exp.match(this.regular);

			return {
				from: value,
				to: value
			};
		},
	},
	{
		regular: /^(\d)\s*,\s*(\d)$/,
		resolve(exp) {
			const [_, from, to] = exp.match(this.regular);

			if (from > to) {
				throw new Error('It MUST be from <= to.');
			}

			return { from, to };
		}
	}
];

function validateRangeByLength({ to }, length) {

	if (to > length) {
		throw new Error('The to should < length');
	}

	return true;
}

function resolve(expression) {

	expression = expression.trim();

	const rule = RANGE_RESOLVER.find(rule => {
		return rule.regular.test(expression);
	});

	if (rule === undefined) {
		throw new Error('No rule matched.');
	}

	return rule.resolve(expression);
}

class Range {

	constructor(checkingLength, expression = '1') {
		const range = resolve(expression);

		validateRangeByLength(range, checkingLength);

		this.from = range.from;
		this.to = range.to;
	}
	
	validateSample(selectedLength) {
		return this.from <= selectedLength &&
			selectedLength <= this.to;
	}
}

module.exports = { validateRangeByLength, resolve, Range };

