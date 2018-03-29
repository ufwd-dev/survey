'use strict';
import app from 'app';

import en_US from './i18n/en_US.yaml';
import zh_CN from './i18n/zh_CN.yaml';

app.i18n.mergeLocaleMessage('en', en_US);
app.i18n.mergeLocaleMessage('zh', zh_CN);

app.i18n.locale = 'en';

import Home from 'app/component/Home.vue';

import Survey from './component/survey/Survey.vue';
import AddSurvey from './component/survey/Create.vue';
import SurveyDetail from './component/survey/Detail.vue';

import Vote from './component/vote/Vote.vue';
import AddVote from './component/vote/Create.vue';
import VoteDetail from './component/vote/Detail.vue';
import VoteReport from './component/vote/Report.vue';

app.menu.addGroup('survey', [
	{
		label: 'item.survey',
		path: '/ufwd/survey/survey'
	},
	{
		label: 'item.vote',
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
				path: 'vote-report',
				component: VoteReport
			},
			{
				path: 'survey',
				component: Survey
			},
			{
				path: 'add-survey',
				component: AddSurvey
			},
			{
				path: 'survey/:id/detail',
				component: SurveyDetail
			}
		]
	}
]);