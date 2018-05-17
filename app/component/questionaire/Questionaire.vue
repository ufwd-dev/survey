<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">问卷</li>
		</ol>
	</nav>

	<h3>全部问卷</h3>
	<hr>

	<data-tables
		:data="surveyList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:checkbox-filter-def="checkboxFilterDef"
		:actions-def="actionsDef">
		<el-table-column
			v-for="(column, index) in surveyColumns"
			:key="index"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width"
			:minWidth="column.minWidth">
		</el-table-column>
		<el-table-column
			label="操作"
			width="80"
			align="center">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getSurveyById(scope.row.id)">查看</el-button>
			</template>
		</el-table-column>
	</data-tables>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'survey',
	data() {
		return {
			surveyList: [],
			surveyColumns: [
				{
					label: '问卷标题',
					prop: 'title',
					minWidth: '180'
				},
				{
					label: '标签',
					prop: 'label',
					minWidth: '180'
				},
				{
					label: '发布状态',
					prop: 'published',
					width: '160'
				},
				{
					label: '创建时间',
					prop: 'created_at',
					width: '180'
				},
				{
					label: '结束时间',
					prop: 'time',
					width: '180'
				}
			],
			searchDef: {
				show: false
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20],
			},
			checkboxFilterDef: {
				colProps: {
					span: 6
				},
				def: [
					{
						'code': '已发布',
						'name': '已发布'
					},
					{
						'code': '未发布',
						'name': '未发布'
					}
				]
			},
			filterFunction(el, filter) {
				return el['published'] === filter.vals[0];
			},
			actionsDef: {
				colProps: {
					span: 3
				},
				def: [
					{
						name: '新建',
						handler: () => {
							this.$router.push('add-questionaire');
						}
					}
				]
			}
		}
	},
	mounted() {
		this.getSurveyList();
	},
	methods: {
		getSurveyById(id) {
			return this.$router.push(`questionaire/${id}/detail`);
		},
		getSurveyList() {
			return axios.get('/api/ufwd/service/survey')
				.then(res => {
					this.surveyList = res.data.data;
				})
		}
	}
}
</script>