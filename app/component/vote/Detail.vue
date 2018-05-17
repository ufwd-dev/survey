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
			<li class="breadcrumb-item active">投票标题：{{vote.title}}</li>
		</ol>
	</nav>

	<h3>修改投票</h3>
	<hr>

	<div class="row">
		<div class="col-sm-6">
			
			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>基本信息</span>
				</div>

				<el-form :model="vote"
					label-position="top">
					<el-form-item label="投票名称">
						<el-input v-model="vote.title"></el-input>
					</el-form-item>

					<el-form-item label="问题">
						<el-input
							type="textarea"
							rows="3"
							v-model="vote.question"></el-input>
					</el-form-item>

					<el-form-item label="投票规则">
						<el-input
							type="textarea"
							rows="5"
							v-model="vote.rule"></el-input>
					</el-form-item>

					<el-form-item label="标签">
						<el-input v-model="vote.tag"></el-input>
					</el-form-item>

					<el-form-item label="开始时间"
						v-if="isUnpublished">
						<el-date-picker
							type="datetime"
							placeholder="请选择开始日期和时间"
							v-model="vote.start"></el-date-picker>
					</el-form-item>

					<el-form-item label="结束时间"
						v-if="isUnpublished">
						<el-date-picker
							type="datetime"
							placeholder="请选择结束日期和时间"
							v-model="vote.end"></el-date-picker>
					</el-form-item>

					<el-form-item label="发布投票"
						v-if="isUnpublished">
						<el-switch v-model="vote.published"></el-switch>
					</el-form-item>

					<el-form-item>
						<el-button type="danger"
							@click="">立即结束</el-button>
						<el-button type="primary"
							v-if="isUnpublished"
							@click="updateVote()">更新</el-button>
					</el-form-item>
				</el-form>
			</el-card>

			<el-card class="box-card mt-3" shadow="never"
				v-if="isUnpublished">
				<div slot="header">
					<span>投票选项</span>
				</div>

				<el-form :model="vote">
					<el-form-item
						v-for="(option, index) in vote.options"
						:label="`选项 ${index + 1}`"
						:key="option.key"
						:prop="`options.${index}.value`"
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
			
			<el-card class="box-card" shadow="never"
				v-if="isUnpublished">
				<div slot="header">
					<span>投票预览</span>
				</div>

				<h4>{{vote.title}}</h4>
				<hr>

				<p>投票时间：{{vote.start|timeFormat}} - {{vote.end|timeFormat}}</p>

				<p>问题：{{vote.question}}</p>

				<p>选项：</p>
				<el-radio-group>
					<el-radio
						v-for="(option, index) in vote.optionList"
						:label="option.value"
						:key="index"
						class="d-block ml-0"></el-radio>
				</el-radio-group>	
			</el-card>

			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>投票结果</span>
				</div>

				<h4>{{vote.title}}</h4>
				<hr>

				<p>投票时间：{{vote.start|timeFormat}} - {{vote.end|timeFormat}}</p>

				<p>问题：{{vote.question}}</p>

				<p>选项：</p>
				<el-form :model="vote">
					<el-form-item
						v-for="(option, index) in vote.options"
						:key="index"
						:label="`选项 ${index + 1}：${option.value}`">
						<el-progress :percentage="20"
							:text-inside="true"
							:stroke-width="18"></el-progress>
					</el-form-item>
				</el-form>
			</el-card>
		</div>

	</div>
</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

const VOTE_URL = '/api/ufwd/service/vote';

export default {
	name: 'vote-detail',
	data() {
		return {
			vote: {
				options: [
					{
						value: ''
					}
				]
			},
			isUnpublished: null
		}
	},
	computed: {
		voteId() {
			return this.$route.params.id;
		}
	},
	methods: {
		removeOption(item) {
			let index = this.vote.options.indexOf(item);

			if (index !== -1) {
				this.vote.options.splice(index, 1);
			}
		},
		addOption() {
			this.vote.options.push({
				value: '',
				key: Date.now()
			})
		},
		getVote() {
			return axios.get(`${VOTE_URL}/${this.voteId}`)
				.then(res => {

					if (!res.data.data.published) {
						this.isUnpublished = true;
					}
					this.vote = res.data.data;
				});
		},
		updateVote() {
			return axios.put(`${VOTE_URL}/${this.voteId}`, {

			})
		},
		addVoteTag() {
			return axios.post(`${VOTE_URL}/${this.voteId}/tag`, {
				tagName: ''
			}).then(this.modifyVote());
		},
		deleteVote() {
			return axios.delete(`${VOTE_URL}/${this.voteId}`);
		},
		getVoteReport() {
			return this.$router.push(`vote/${id}/report`);
		}
	},
	filters: {
		timeFormat(time) {
			return dateFormat(time, 'yyyy/mm/dd HH:MM');
		}
	},
	mounted() {
		this.getVote();
	}
}
</script>