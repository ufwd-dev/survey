'use strict';

const UfwdAccount = require('lemonitor-service').sequelize.model('ufwdAccount');
const { Survey, SurveyTag, SurveySample } = require('./survey');
const { Vote, VoteTag, VoteSample } = require('./vote');

Survey.hasMany(SurveyTag, {
	foreignKey: 'surveyId'
});
SurveyTag.belongsTo(Survey, {
	foreignKey: 'surveyId'
});

Survey.hasMany(SurveySample, {
	foreignKey: 'surveyId'
});
SurveySample.belongsTo(Survey, {
	foreignKey: 'surveyId'
});
UfwdAccount.hasMany(SurveySample, {
	foreignKey: 'accountId'
});
SurveySample.belongsTo(UfwdAccount, {
	foreignKey: 'accountId'
});

Vote.hasMany(VoteTag, {
	foreignKey: 'voteId'
});
VoteTag.belongsTo(Vote, {
	foreignKey: 'voteId'
});

Vote.hasMany(VoteSample, {
	foreignKey: 'voteId'
});
VoteSample.belongsTo(Vote, {
	foreignKey: 'voteId'
});
UfwdAccount.hasMany(VoteSample, {
	foreignKey: 'accountId'
});
VoteSample.belongsTo(UfwdAccount, {
	foreignKey: 'accountId'
});