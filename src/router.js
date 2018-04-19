'use strict';

const {
	isAccountSignedIn,
	$testBody,
	$testQuery
} = require('express-handler-loader')('all');

const {
	isAdminiSignedIn
} = require('express-handler-loader')('ufwd');

const {
	createSurvey,
	getSurveyList,
	getSurvey,
	modifySurveyTime,
	isSurveyPublished,
	updateSurvey,
	deleteSurvey,
	createSurveyTag,
	deleteSurveyTag,
	createVote,
	getVoteList,
	getVote,
	modifyVoteTime,
	updateVote,
	deleteVote,
	isVotePublished,
	createVoteTag,
	deleteVoteTag,
	createComment,
	getOwnSurveyList,
	getOwnVoteList,
	getOwnVoteSample,
	createSurveySample,
	createVoteSample,
	getSurveySample,
	getVoteReport,
	getUnexpiredSurvey,
	getUnexpiredVote
} = require('express-handler-loader')('ufwd_survey');

const router = module.exports = require('express').Router();

router.post('/api/ufwd/service/survey', $testBody({
	properties: {
		title: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			format: 'date-time'
		},
		content: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					question: {
						type: 'string'
					},
					range: {
						type: 'string',
						pattern: '^(\\s*\\d{1}\\s*|\\s*\\d{1}\\s*,\\s*\\d{1}\\s*)$'
					},
					options: {
						type: 'array'
					}
				},
				additionalProperties: false,
				required: ['question', 'options']
			}
		},
		published: {
			type: 'boolean'
		}
	},
	required: ['title', 'rule', 'time', 'content'],
	additionalProperties: false
}), isAdminiSignedIn, createSurvey);

router.get('/api/ufwd/service/survey', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		tag: {
			type: 'string'
		},
		close: {
			type: 'string',
			format: 'date-time'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'

		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getSurveyList);

router.get('/api/ufwd/service/survey/:surveyId', isAdminiSignedIn, getSurvey);

router.put('/api/ufwd/service/survey/:surveyId', $testBody({
	properties: {
		title: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			format: 'date-time'
		},
		content: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					question: {
						type: 'string'
					},
					range: {
						type: 'string',
						pattern: '^(\\s*\\d{1}\\s*|\\s*\\d{1}\\s*,\\s*\\d{1}\\s*)$'
					},
					options: {
						type: 'array'
					}
				},
				additionalProperties: false,
				required: ['question', 'options']
			}
		},
		published: {
			type: 'boolean'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getSurvey, isSurveyPublished, updateSurvey);

router.delete('/api/ufwd/service/survey/:surveyId', getSurvey, isSurveyPublished, deleteSurvey);

router.post('/api/ufwd/service/survey/:surveyId/tag', $testBody({
	properties: {
		tag: {
			type: 'string'
		}
	},
	require: ['tag'],
	additionalProperties: false
}), isAdminiSignedIn, getSurvey, isSurveyPublished, createSurveyTag);

router.delete('/api/ufwd/service/survey/tag/:tagId', isAdminiSignedIn, deleteSurveyTag);

router.post('/api/ufwd/service/vote', $testBody({
	properties: {
		title: {
			type: 'string'
		},
		question: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			format: 'date-time'
		},
		options: {
			type: 'array',
			items: {
				type: 'string'
			}
		},
		range: {
			type: 'string',
			pattern: '^(\\s*\\d{1}\\s*|\\s*\\d{1}\\s*,\\s*\\d{1}\\s*)$'
		},
		published: {
			type: 'boolean'
		}
	},
	required: ['title', 'question', 'rule', 'time', 'options', 'range', 'published'],
	additionalProperties: false
}), isAdminiSignedIn, createVote);

router.get('/api/ufwd/service/vote', $testQuery({
	properties: {
		keyword: {
			type: 'string'
		},
		tag: {
			type: 'string'
		},
		close: {
			type: 'string',
			format: 'date-time'
		},
		published: {
			type: 'string',
			pattern: '^(true|false)$'

		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getVoteList);

router.get('/api/ufwd/service/vote/:voteId', isAdminiSignedIn, getVote);

router.put('/api/ufwd/service/vote/:voteId', $testBody({
	properties: {
		title: {
			type: 'string',
			minLength: 4
		},
		question: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			format: 'date-time'
		},
		options: {
			type: 'array',
			items: {
				type: 'string'
			}
		},
		range: {
			type: 'string',
			pattern: '^(\\s*\\d{1}\\s*|\\s*\\d{1}\\s*,\\s*\\d{1}\\s*)$'
		},
		published: {
			type: 'boolean'
		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getVote, isVotePublished, updateVote);

router.put('/api/ufwd/service/survey/:surveyId/time', $testBody({
	properties: {
		time: {
			type: 'string',
			format: 'date-time'
		}
	},
	required: ['time'],
	additionalProperties: false
}), isAdminiSignedIn, getSurvey, modifySurveyTime);

router.put('/api/ufwd/service/vote/:voteId/time', $testBody({
	properties: {
		time: {
			type: 'string',
			format: 'date-time'
		}
	},
	required: ['time'],
	additionalProperties: false
}), isAdminiSignedIn, getVote, modifyVoteTime);

router.delete('/api/ufwd/service/vote/:voteId', getVote, isVotePublished, deleteVote);

router.post('/api/ufwd/service/vote/:voteId/tag', $testBody({
	properties: {
		tag: {
			type: 'string'
		}
	},
	require: ['tag'],
	additionalProperties: false
}), isAdminiSignedIn, getVote, isVotePublished, createVoteTag);

router.delete('/api/ufwd/service/vote/tag/:tagId', isAdminiSignedIn, deleteVoteTag);

router.put('/api/ufwd/service/vote/:voteId/comment', $testBody({
	properties: {
		comment: {
			type: 'string'
		}
	},
	additionalProperties: false,
	required: ['comment']
}), isAdminiSignedIn, createComment);

router.get('/api/ufwd/app/survey', $testQuery({
	properties: {
		keyword: {
			type: 'string',
			minLength: 4
		},
		tag: {
			type: 'string'
		},
		close: {
			type: 'string',
			format: 'date-time'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getOwnSurveyList);

router.get('/api/ufwd/app/vote', $testQuery({
	properties: {
		keyword: {
			type: 'string',
			minLength: 4
		},
		tag: {
			type: 'string'
		},
		close: {
			type: 'string',
			format: 'date-time'
		},
		selft: {
			type: 'string',
			pattern: '(^true$|^false$)'
		}
	},
	additionalProperties: false
}), isAccountSignedIn, getOwnVoteList);

router.post('/api/ufwd/app/survey/:surveyId/sample', $testBody({
	properties: {
		answer: {
			type: 'array',
			items: {
				type: 'array',
				items: {
					type: 'number',
					minimum: 0,
					maximum: 1
				}
			}
		}
	},
	required: ['answer'],
	additionalProperties: false
}), isAdminiSignedIn, createSurveySample);

router.post('/api/ufwd/app/vote/:voteId/sample', $testBody({
	properties: {
		answer: {
			type: 'array',
			items: {
				type: 'number',
				minimum: 0,
				maximum: 1
			}
		}
	},
	required: ['answer'],
	additionalProperties: false
}), isAdminiSignedIn, createVoteSample);

router.get('/api/ufwd/service/survey/:surveyId/sample', isAdminiSignedIn, getSurvey, getSurveySample);

router.get('/api/ufwd/app/vote/:voteId/sample', isAccountSignedIn, getOwnVoteSample);

router.get('/api/ufwd/service/vote/:voteId/report', isAdminiSignedIn, getVote, getVoteReport);

router.get('/api/ufwd/app/survey/:surveyId', isAccountSignedIn, getSurvey, getUnexpiredSurvey);

router.get('/api/ufwd/app/vote/:voteId', isAccountSignedIn, getVote, getUnexpiredVote);

router.get('/api/ufwd/app/vote/:voteId/report', isAccountSignedIn, getVote, getVoteReport);
