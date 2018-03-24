'use strict';

const { surveyResolve } = require('express-handler-loader')('ufwd_survey_util');

const assert = require('assert');

describe('surveyResolve test', function() {
	describe('argument 0 is not an array test', function() {});

	describe('argument 1 is not an array test', function() {});

	describe('argument 1 is not an array test', function() {});

	describe('topic is not existed test', function() {});

	describe('radio test', function() {
		describe('the topic is not recorded test', function() {});

		describe('the option is not recorded test', function() {
			describe('the option is not exited', function () {

            });
		});

		describe('the option is recorded test', function() {});
	});

	describe('multi-select test', function() {
		describe('the topic is not recorded test', function() {});

		describe('the option is not recorded test', function() {
			describe('the option is not exited', function () {

            });
		});

		describe('the option is recorded test', function() {});
	});

	describe('default test', function() {
		describe('the topic is not recorded test', function() {});

		describe('the topic is recorded test', function() {});
	});
});