service:
===========================

## POST /api/ufwd/service/vote
创建一个投票
```
{
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
		type: 'string',
		pattern: '^(true|false)$'
	}

}
```

## GET /api/ufwd/service/vote?keyword=string&close=string&tag=string&published=boolean
查看所有的投票

## GET /api/ufwd/service/vote/:voteId
查看某个投票

## PUT /api/ufwd/service/vote/:voteId
修改某个投票（未发布的）
```
{
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
			type: 'string',
			pattern: '^(true|false)$'

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

## PUT /api/ufwd/service/vote/:voteId/time
修改某个投票结束时间
```
{
	time: {
		type: 'string',
		format: 'date-time'
	}
}
```
## ADD
## DELETE /api/ufwd/service/vote/:voteId/tag
给某个投票删除标签

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
			pattern: 'date-time'
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
			type: 'string',
			pattern: '^(true|false)$'

		}
	}
}

## GET /api/ufwd/service/survey?keyword=string&close=date&tag=string&publised=boolean
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
			pattern: 'date-time'
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
			type: 'string',
			pattern: '^(true|false)$'

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

## PUT /api/ufwd/service/survey/:surveyId/time
修改某个问卷结束时间
```
{
	time: {
		type: 'string',
		format: 'date-time'
	}
}
```

app:
======================================

## GET /api/ufwd/app/vote?keyword=string&time=string&self=true&tag=string
查看所有的投票

## POST /api/ufwd/app/vote/:voteId/sample
提交某个投票的回复
```
{
    answer: {
		type: 'array',
		items: {
			type: 'number',
			minimum: 0,
			maximum: 1
		}
	}
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
    }
}
```
## ADDED

## GET /api/ufwd/app/vote/:voteId
查看某个投票

## GET /api/ufwd/app/survey/:surveyId
查看某个的问卷