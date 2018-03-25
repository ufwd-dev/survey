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
	isSurveyPublished,
	updateSurvey,
	deleteSurvey,
	createSurveyTag,
	deleteSurveyTag,
	createVote,
	getVoteList,
	getVote,
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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ((1|0)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$)'
		},
		content: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					topic: {
						type: 'string'
					},
					type: {
						type: 'string'
					},
					options: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								option: {
									type: 'string'
								},
								content: {
									type: 'string'
								}
							},
							additionalProperties: false,
							required: ['option', 'content']
						}
					}
				},
				additionalProperties: false,
				required: ['topic', 'type', 'options']
			}
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

		}
	},
	required: ['title', 'rule', 'time', 'content', 'published'],
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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$)'
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ((1|0)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$)'
		},
		content: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					topic: {
						type: 'string'
					},
					type: {
						type: 'string'
					},
					options: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								option: {
									type: 'string'
								},
								content: {
									type: 'string'
								}
							},
							additionalProperties: false,
							required: ['option', 'content']
						}
					}
				},
				additionalProperties: false,
				required: ['topic', 'type', 'options']
			}
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

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
		topic: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ((1|0)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$)'
		},
		content: {
			type: 'object',
			properties: {
				type: {
					type: 'string'
				},
				options: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							option: {
								type: 'string'
							},
							content: {
								type: 'string'
							}
						},
						additionalProperties: false,
						required: ['option', 'content']
					}
				}
			}
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

		}
	},
	required: ['title', 'topic', 'rule', 'time', 'content', 'published'],
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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$)'
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

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
		topic: {
			type: 'string',
			minLength: 4
		},
		rule: {
			type: 'string'
		},
		time: {
			type: 'string',
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) ((1|0)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$)'
		},
		content: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					type: {
						type: 'string'
					},
					options: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								option: {
									type: 'string'
								},
								content: {
									type: 'string'
								}
							},
							additionalProperties: false,
							required: ['option', 'content']
						}
					}
				}
			}
		},
		published: {
			type: 'string',
			pattern: '(^0$|^1$)'

		}
	},
	additionalProperties: false
}), isAdminiSignedIn, getVote, isVotePublished, updateVote);

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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$)'
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
			pattern: '(^(19|20)[0-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$)'
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
				type: 'object',
				properties: {
					topicNumber: {
						type: 'number',
						mininum: 1
					},
					options: {
						type: 'array',
						items: {
							type: 'string',
						},
						uniqueItems: true
					}
				},
				additionalProperties: false,
				required: ['topicNumber', 'options']
			},
			uniqueItems: true
		}
	},
	required: ['answer'],
	additionalProperties: false
}), isAdminiSignedIn, createSurveySample);

router.post('/api/ufwd/app/vote/:voteId/sample', $testBody({
	properties: {
		answer: {
			type: 'string',
			pattern: '(^[A-Za-z]{1}[,A-Za-z]*$)'
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