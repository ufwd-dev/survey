'use strict';

const lemonitor = require('lemonitor-service');
const sequelize = lemonitor.sequelize;

const Account = sequelize.model('account');
const Admini = sequelize.model('ufwdAdministrator');
const UfwdAccount = sequelize.model('ufwdAccount');

Account.bulkCreate([
	{name: '11111', password: '123456'},
	{name: '22222', password: '123456'},
	{name: '33333', password: '123456'},
	{name: '44444', password: '123456'},
	{name: '55555', password: '123456'}
]);

UfwdAccount.bulkCreate([
	{accountId: 1, name: '一', sex: 'female', phone: '138111111', examine: true},
	{accountId: 2, name: '二', sex: 'female', phone: '138222222', examine: true},
	{accountId: 3, name: '三', sex: 'male', phone: '138333333', examine: true},
	{accountId: 4, name: '四', sex: 'female', phone: '138444444', examine: true},
	{accountId: 5, name: '五', sex: 'male', phone: '138555555', examine: true}
]);

// Admini.create(
// 	{accountId: 1}
// );
// Admini.create(
// 	{accountId: 3}
// );
// Admini.create(
// 	{accountId: 4}
// );