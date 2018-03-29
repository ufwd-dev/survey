<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Survey</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="a"
				to="add-survey"
				class="btn btn-primary">+ New</router-link>
		</div>
		<div class="col-7">
			<div class="input-group">
				<input type="text" class="form-control">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary"
						type="button"><i class="fa fa-search"></i></button>
				</div>
			</div>
		</div>
	</div>

	<h3 class="mt-4">All surveys</h3>
	<hr>

	<data-tables
		:data="surveyList"
		:search-def="searchDef"
		:pagination-def="paginationDef">
		<el-table-column
			v-for="(column, index) in surveyColumns"
			:key="index"
			:label="column.label"
			:prop="column.field"
			sortable="custom">
		</el-table-column>
		<el-table-column label="Action" width="80">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getSurveyContent(scope.row.id)">Edit</el-button>
			</template>
		</el-table-column>
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'survey',
	data() {
		return {
			surveyList: [],
			surveyColumns: [
				{
					label: 'Title',
					field: 'title'
				},
				{
					label: 'Label',
					field: 'label'
				},
				{
					label: 'Status',
					field: 'published'
				},
				{
					label: 'Participants',
					field: 'count'
				},
				{
					label: 'Created time',
					field: 'created_at'
				},
				{
					label: 'End time',
					field: 'time'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
		}
	},
	mounted() {
		return axios.get(`/api/ufwd/service/survey`)
			.then(res => {
				this.surveyList = res.data.data;
			}).then(() => {
				this.surveyList.forEach(survey => {
					return axios.get(`/api/ufwd/service/survey/${survey.id}/sample`)
						.then(res => {
							survey.count = res.data.data.length;
						})
						.catch(err => {
							survey.count = 0;
						})
				});
			})
	},
	methods: {
		getSurveyContentById(id) {
			return this.$router.push(`survey/${id}/detail`);
		},
	}
}
</script>