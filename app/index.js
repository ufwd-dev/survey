'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'zh';

import Home from 'app/component/Home.vue';

import Questionaire from './component/questionaire/Questionaire.vue';
import AddQuestionaire from './component/questionaire/Create.vue';
import QuestionaireDetail from './component/questionaire/Detail.vue';

import Vote from './component/vote/Vote.vue';
import AddVote from './component/vote/Create.vue';
import VoteDetail from './component/vote/Detail.vue';
import VoteReport from './component/vote/Report.vue';

app.menu.addGroup('ufwdSurvey.menu.survey', [
	{
		label: 'ufwdSurvey.survey.questionaire',
		path: '/ufwd/survey/questionaire'
	},
	{
		label: 'ufwdSurvey.survey.vote',
		path: '/ufwd/survey/vote'
	}
]);

app.router.addRoutes([
	{
		path: '/ufwd/survey',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'vote',
				component: Vote
			},
			{
				path: 'vote/:id/detail',
				component: VoteDetail
			},
			{
				path: 'add-vote',
				component: AddVote
			},
			{
				path: 'vote/:id/vote-report',
				component: VoteReport
			},
			{
				path: 'questionaire',
				component: Questionaire
			},
			{
				path: 'add-questionaire',
				component: AddQuestionaire
			},
			{
				path: 'questionaire/:id/detail',
				component: QuestionaireDetail
			}
		]
	}
]);