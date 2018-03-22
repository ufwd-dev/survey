service:
===========================

## POST /api/ufwd/service/vote
创建一个投票
```
{
    title: string,
    topic: string,
    options: string,
    statistic: text,
    time: date,
    rule: string,
    published: tinyint(0, 1)
}
```

## GET /api/ufwd/service/vote?keyword=string&time=string&tag=string&published=boolean
查看所有的投票

## GET /api/ufwd/service/vote/:voteId
查看某个投票

## PUT /api/ufwd/service/vote/:voteId
修改某个投票状态
```
{
    time: date,
    published: tinyint(0, 1)
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
    title: string,
    rule: string,
    time: date,
    statistic: TEXT,
    content: TEXT,
    published: tinyint(0, 1)
}

## GET /api/ufwd/service/survey?keyword=string&close=date&tag=string&publised=tinyint
查看所有的问卷

## GET /api/ufwd/service/survey/:surveyId
查看某个的问卷

## PUT /api/ufwd/service/survey/:surveyId
修改某个的问卷(当问卷未发布时)
```
{
    time: date,
    published: tinyint
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
## DELETE /api/ufwd/service/survey/:surveyId/tag
给某个问卷删除标签

## GET /api/ufwd/service/survey/:surveyId/sample
查看某个问卷填写情况

app:
======================================

## GET /api/ufwd/app/vote?keyword=string&time=string&self=true
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


## GET /api/ufwd/app/survey&keyword=string&time=string
查看所有的问卷

## POST /api/ufwd/app/survey/:surveyId/sample
提交问卷填写
```
{
    answer: TEXT
}
```