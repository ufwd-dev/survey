'use strict';

const Sequelize = require('sequelize');
const sequelize = require('lemonitor-service').sequelize;

const Survey = sequelize.define('ufwdSurvey', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	rule: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	time: {
		type: Sequelize.DATE,
		allowNull: false
	},
	statistic: {
		type: Sequelize.JSON
	},
	content: {
		type: Sequelize.JSON,
		allowNull: false
	},
	published: {
		type: Sequelize.TINYINT,
		allowNull: false,
		defaultValue: 0
	}
}, {
	paranoid: true
});

const SurveyTag = sequelize.define('ufwdSurveyTag', {
	tag: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

const SurveySample = sequelize.define('ufwdSurveySample', {
	answer: {
		type: Sequelize.JSON,
		allowNull: false
	}
}, {
	paranoid: true
});

module.exports = { Survey, SurveyTag, SurveySample };