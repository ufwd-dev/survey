<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item active">投票</li>
		</ol>
	</nav>

	<h3>全部投票</h3>
	<hr>

	<data-tables
		:data="voteList"
		:search-def="searchDef"
		:pagination-def="paginationDef"
		:checkbox-filter-def="checkboxFilterDef"
		:actions-def="actionsDef">
		<el-table-column
			v-for="column in voteColumns"
			:key="column.label"
			align="center"
			:label="column.label"
			:prop="column.prop"
			:sortable="column.sortable"
			:width="column.width"
			:minWidth="column.minWidth">
		</el-table-column>
		<el-table-column
			label="操作"
			width="120"
			align="center">
			<template slot-scope="scope">
				<el-button type="text"
					@click="getVoteById(scope.row.id)">查看</el-button>
			</template>
		</el-table-column>
	</data-tables>
	
</div>
</template>

<script>
import axios from 'axios';
import DataTables from 'vue-data-tables';

export default {
	name: 'vote',
	components: { DataTables },
	data() {
		return {
			voteList: [],
			voteIsPulished: true,
			voteColumns: [
				{
					label: '投票标题',
					prop: 'title',
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
					sortable: 'custom',
					width: '180'
				},
				{
					label: '过期时间',
					prop: '',
					width: '180'
				}
			],
			searchDef: {
				colProps: {
					span: 8
				},
				props: ['title']
			},
			paginationDef: {
				pageSize: 10,
				pageSizes: [5, 10, 20]
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
							this.$router.push('add-vote');
						}
					}
				]
			}
		}
	},
	methods: {
		getVoteById(id) {
			this.$router.push(`vote/${id}/detail`);
		},
		getVoteList() {
			return axios.get(`/api/ufwd/service/vote`)
				.then(res => {
					this.voteList = res.data.data;
				})
		},
	},
	mounted() {
		this.getVoteList();
	}
}
</script>
