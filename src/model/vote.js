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
	range: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '1'
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
		defaultValue: 0,
		set(published) {

			published === 'true' ? this.setDataValue('published', 1) : this.setDataValue('published', 0);
		},
		get() {
			const published = this.getDataValue('published');

			return published === 1 ? true : false;
		}
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
		
		const voteObject = VoteFactory(this.range, this.options);
		
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