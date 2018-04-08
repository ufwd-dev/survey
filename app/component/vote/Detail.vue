<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item">
				<router-link tag="a" to="/ufwd/survey/vote">Vote</router-link>
			</li>
			<li class="breadcrumb-item active">Detail: {{voteId}}</li>
		</ol>
	</nav>

	<h3>Vote detail</h3>
	<hr>
	<div class="container">

		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Title</label>
			<div class="col-sm-10">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Question</label>
			<div class="col-sm-10">
				<textarea type="text" class="form-control"></textarea>
			</div>
		</div>
		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Options</label>
			<div class="col-sm-10">
				<ul class="list-group">
					<li class="list-group-item">Option 1</li>
					<li class="list-group-item">Option 2</li>
				</ul>
			</div>
		</div>
		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Tag</label>
			<div class="col-sm-10">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Rules</label>
			<div class="col-sm-10">
				<input type="text" class="form-control">
			</div>
		</div>
		<div class="form-group row">
			<div class="col-sm-2">Publish</div>
			<div class="col-sm-10">
				<div class="form-check-inline">
					<input class="form-check-input" type="checkbox" id="gridCheck1">
					<label class="form-check-label" for="gridCheck1">
						Yes
					</label>
				</div>
				<div class="form-check-inline">
					<input class="form-check-input" type="checkbox" id="gridCheck2" checked>
					<label class="form-check-label" for="gridCheck2">
						No
					</label>
				</div>
			</div>
		</div>

		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">Start</label>
			<div class="col-sm-10">
				<input type="date" class="form-control">
			</div>
		</div>
		<div class="form-group row">
			<label for="" class="col-sm-2 col-form-label">End</label>
			<div class="col-sm-10">
				<div class="input-group">
					<input
						type="date"
						class="form-control">
					<div class="input-group-append">
						<button class="btn btn-warning"
							type="button">End now</button>
					</div>
				</div>

			</div>
		</div>

		<div class="from-group mt-5">
			<router-link tag="button"
				to="/ufwd/survey/vote/1/vote-report"
				class="btn btn-primary btn-lg mr-3">Result</router-link>
			<button class="btn btn-danger btn-lg">Delete</button>
		</div>

	</div>
</div>
</template>

<script>
import axios from 'axios';

const VOTE_URL = '/api/ufwd/service/vote';

export default {
	name: 'vote-detail',
	data() {
		return {

		}
	},
	computed: {
		voteId() {
			return this.$route.params.id;
		}
	},
	methods: {
		getVote() {
			return axios.get(`${VOTE_URL}/${this.voteId}`)
				.then(res => {
					this.vote = res.data.data;
				});
		},
		modifyVote() {
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
	}
}
</script>