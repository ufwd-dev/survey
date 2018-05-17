<template>
	<div>
		<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/survey/questionaire">问卷</router-link>
			</li>
			<li class="breadcrumb-item active">问卷标题：{{survey.title}}</li>
		</ol>
	</nav>

	<h3>修改问卷</h3>
	<hr>
	
	</div>
</template>

<script>
import axios from 'axios';

const SURVEY_URL = '/api/ufwd/service/survey';

export default {
	name: 'survey-deatil',
	data() {
		return {
			survey: {}
		}
	},
	computed: {
		surveyId() {
			return this.$route.params.id;
		}
	},
	methods: {
		getSurvey() {
			return axios.get(`${SURVEY_URL}/${this.surveyId}`)
				.then(res => {
					this.survey = res.data.data;
				});
		},
		updateSurvey() {
			return axios.put(`${SURVEY_URL}/${this.surveyId}`, {

			})
		},
		addSurveyTag() {
			return axios.post(`${SURVEY_URL}/${this.surveyId}/tag`, {
				tag: ''
			})
		},
		deleteSurvery() {
			return axios.delete(`${SURVEY_URL}/${this.surveyId}`);
		}
	},
	mounted() {
		this.getSurvey();
	}
}
</script>

