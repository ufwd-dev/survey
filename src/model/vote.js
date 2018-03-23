'use strict';

const Sequelize = require('sequelize');
const sequelize = require('lemonitor-service').sequelize;

const Vote = sequelize.define('ufwdVote', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	topic: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
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

const VoteTag = sequelize.define('ufwdVoteTag', {
	tag: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const VoteSample = sequelize.define('ufwdVoteSample', {
	answer: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {
	paranoid: true
});

module.exports = { Vote, VoteTag, VoteSample };