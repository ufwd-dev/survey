<template>
	<div>
		<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/survey/survey">Survey</router-link>
			</li>
			<li class="breadcrumb-item active">title</li>
		</ol>
	</nav>
	</div>
</template>

<script>
import axios from 'axios';

const SURVEY_URL = '/api/ufwd/service/survey';

export default {
	name: 'survey-deatil',
	data() {
		return {

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
		modifySurvey() {
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

	}
}
</script>

