'use strict';

const Sequelize = require('sequelize');
const sequelize = require('lemonitor-service').sequelize;
const { VoteFactory } = require('../util/vote/resolve');

const Vote = sequelize.define('ufwdVote', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	question: {
		type: Sequelize.STRING,
		allowNull: false
	},
	number: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	},
	range: {
		type: Sequelize.ENUM('-1', '0', '1'),
		allowNull: false,
		defaultValue: '0'
	},
	options: {
		type: Sequelize.JSON,
		allowNull: false
	},
	statistic: {
		type: Sequelize.JSON
	},
	time: {
		type: Sequelize.DATE,
		allowNull: false
	},
	rule: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	published: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0
	},
	count: {
		type: Sequelize.INTEGER,
		allowNull: 0,
		defaultValue: 0
	},
	comment: {
		type: Sequelize.STRING
	}
}, {
	paranoid: true
});

Vote.prototype.getVoteStatistic = function () {
	const sampList = [];

	if (!/^[-]1$|^0$|^1$/.test(this.range)) {
		throw new Error('The range of vote is illegal.');
	}

	if (typeof this.number !== 'number' || this.number < 0) {
		throw new Error('The number of vote should be a number and must greater than 0.');
	}
	
	if (!Array.isArray(this.options)) {
		throw new Error('The options of vote should be an array.');
	}

	return VoteSample.findAll({
		where: {
			voteId: this.id
		}
	}).then(list => {

		list.forEach(item => {
			sampList.push(item.answer);
		});
		
		const voteObject = VoteFactory(this.options, this.range, this.number);
		
		return voteObject.analyze(sampList);
	});

};

const VoteTag = sequelize.define('ufwdVoteTag', {
	tag: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const VoteSample = sequelize.define('ufwdVoteSample', {
	answer: {
		type: Sequelize.JSON,
		allowNull: false
	}
}, {
	paranoid: true
});

module.exports = { Vote, VoteTag, VoteSample };