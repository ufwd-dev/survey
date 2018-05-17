<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">首页</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/survey/vote">投票</router-link>
			</li>
			<li class="breadcrumb-item active">添加新投票</li>
		</ol>
	</nav>

	<h3>添加新投票</h3>
	<hr>

	<div class="row">
		<div class="col-sm-6">

			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>基本信息</span>
				</div>

				<el-form :model="voteForm"
					label-position="top">
					<el-form-item label="投票名称">
						<el-input v-model="voteForm.title"></el-input>
					</el-form-item>

					<el-form-item label="问题">
						<el-input
							type="textarea"
							rows="3"
							v-model="voteForm.question"></el-input>
					</el-form-item>

					<el-form-item label="投票规则">
						<el-input
							type="textarea"
							rows="5"
							v-model="voteForm.rule"></el-input>
					</el-form-item>

					<el-form-item label="标签">
						<el-input v-model="voteForm.tag"></el-input>
					</el-form-item>

					<el-form-item label="开始时间">
						<el-date-picker
							type="datetime"
							placeholder="请选择开始日期和时间"
							v-model="voteForm.start"></el-date-picker>
					</el-form-item>

					<el-form-item label="结束时间">
						<el-date-picker
							type="datetime"
							placeholder="请选择结束日期和时间"
							v-model="voteForm.end"></el-date-picker>
					</el-form-item>

					<el-form-item label="发布投票">
						<el-switch v-model="voteForm.published"></el-switch>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"
							@click="createVote()">创建</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<el-card class="box-card mt-3" shadow="never">
				<div slot="header">
					<span>投票选项</span>
				</div>

				<el-form :model="voteForm">
					<el-form-item
						v-for="(option, index) in voteForm.optionList"
						:label="`选项 ${index + 1}`"
						:key="option.key"
						:prop="`optionList.${index}.value`"
						:rules="{
							required: true,
							message: '选项不能为空',
							trigger: 'blur'
						}">
						<el-input v-model="option.value"
							placeholder="请输入选项内容">
							<el-button slot="append"
								@click.prevent="removeOption(option)">删除</el-button>
						</el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"
							@click="addOption()">添加新选项</el-button>
					</el-form-item>
				</el-form>
			</el-card>

		</div>

		<div class="col-sm-6">

			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>投票预览</span>
				</div>

				<h4>{{voteForm.title}}</h4>
				<hr>

				<p>投票时间：{{voteForm.start|timeFormat}} - {{voteForm.end|timeFormat}}</p>

				<p>问题：{{voteForm.question}}</p>

				<p>选项：</p>
				<el-radio-group>
					<el-radio
						v-for="(option, index) in voteForm.optionList"
						:label="option.value"
						:key="index"
						class="d-block ml-0"></el-radio>
				</el-radio-group>	
			</el-card>
		</div>
	</div>

</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

export default {
	name: 'add-vote',
	data() {
		return {
			voteForm: {
				title: '标题',
				question: '',
				rule: '',
				tag: '',
				start: null,
				end: null,
				published: false,
				optionList: [
					{
						value: '选项1'
					}
				]

			}
		}
	},
	methods: {
		removeOption(item) {
			let index = this.voteForm.optionList.indexOf(item);

			if (index !== -1) {
				this.voteForm.optionList.splice(index, 1);
			}
		},
		addOption() {
			this.voteForm.optionList.push({
				value: '',
				key: Date.now()
			});
		},
		createVote() {
			return axios.post(`/api/ufwd/service/vote`, {
				title: this.voteForm.title,
				question: this.voteForm.question,
				rule: this.voteForm.rule,
				published: this.voteForm.published,
				options: this.voteForm.optionList
			}).then(() => {
				this.$notify({
					title: '成功',
					message: '投票创建成功！',
					type: 'success'
				});
			}).catch(err => {
				this.$notify.error({
					title: '失败',
					message: '投票创建失败。'
				})
			})
		}
	},
	filters: {
		timeFormat(time) {
			return dateFormat(time, 'yyyy/mm/dd HH:MM');
		}
	}
}
</script>
