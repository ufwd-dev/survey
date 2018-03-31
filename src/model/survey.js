'use strict';

const Sequelize = require('sequelize');
const sequelize = require('lemonitor-service').sequelize;
const { SurveyFactory } = require('../util/survey/resolve');

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

Survey.prototype.getStatistic = function () {
	const sampleList = [];

	if (!Array.isArray(this.content)) {
		throw new Error('The content of survey should be an array.');
	}

	this.content.forEach(item => {
		
		if (typeof item !== 'object') {
			throw new Error('The item of content should be an object.');
		}

		if (!('question' in item) ||!('options' in item)) {
			throw new Error('The content of survey is illegal.');
		}

		if (!Array.isArray(item.options)) {
			throw new Error('The options of item should be an array.');
		}

		if (item.range && !/^[-]1$|^0$|^1$/.test(item.range)) {
			throw new Error('The range of item is illegal.');
		}

		if (item.number && (typeof item.number !== 'number' || item.number < 0)) {
			throw new Error('The range of item is illegal.');
		}
	});

	return SurveySample.findAll({
		where: {
			surveyId: this.id
		}
	}).then(list => {
		list.forEach(item => {
			sampleList.push(item.answer);
		});

		const survey = SurveyFactory(this.content);

		return survey.analyze(sampleList);
	});
};

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