service:
===========================

## POST /api/ufwd/service/vote
创建一个投票
```
{
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
	}
}
```

## GET /api/ufwd/service/vote?keyword=string&close=string&tag=string&published=boolean
查看所有的投票

## GET /api/ufwd/service/vote/:voteId
查看某个投票

## PUT /api/ufwd/service/vote/:voteId
修改某个投票状态
```
{
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
	}
}
```

## PUT /api/ufwd/service/vote/:voteId/comment
提交某个投票注释(如：作废投票的原因)
```
{
    comment: string
}
```

## DELETE /api/ufwd/service/vote/:voteId
删除某个投票

## POST /api/ufwd/service/vote/:voteId/tag
给某个投票添加标签
```
{
    tagName: string
}
```
## ADD
## DELETE /api/ufwd/service/survey/:surveyId/tag
给某个问卷删除标签

## GET /api/ufwd/service/vote/:voteId/report
查询投票的结果

## POST /api/ufwd/service/survey
创建一个问卷
{
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
	}
}

## GET /api/ufwd/service/survey?keyword=string&close=date&tag=string&publised=tinyint
查看所有的问卷

## GET /api/ufwd/service/survey/:surveyId
查看某个的问卷

## PUT /api/ufwd/service/survey/:surveyId
修改某个的问卷(当问卷未发布时)
```
{
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
	}
}
```

## DELETE /api/ufwd/service/survey/:surveyId
删除某个的问卷

## POST /api/ufwd/service/survey/:surveyId/tag
给某个问卷添加标签
```
{
    tag: string
}
```
## ADD
## DELETE /api/ufwd/service/survey/tag/:tagId
给某个问卷删除标签

## GET /api/ufwd/service/survey/:surveyId/sample
查看某个问卷填写情况

app:
======================================

## GET /api/ufwd/app/vote?keyword=string&time=string&self=true&tag=string
查看所有的投票

## POST /api/ufwd/app/vote/:voteId/sample
提交某个投票
```
{
    answer: string
}
```

## GET /api/ufwd/app/vote/:voteId
查看自己某条的投票信息

## GET /api/ufwd/app/vote/:voteId/report
查看某条投票的结果


## GET /api/ufwd/app/survey?keyword=string&close=string&tag=string
查看所有的问卷

## POST /api/ufwd/app/survey/:surveyId/sample
提交问卷填写
```
{
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
                    }
                }
            },
            additionalProperties: false,
            required: ['topicNumber', 'options']
        }
    }
}
```
## ADDED

## GET /api/ufwd/app/vote/:voteId
查看某个投票

## GET /api/ufwd/app/survey/:surveyId
查看某个的问卷