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
			<li class="breadcrumb-item active">{{voteId}}</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-8">
			<h3>xxx vote</h3>
			<hr>

			<form>
				<fieldset class="form-group">
					<legend>1. What fruit do you like best?</legend>
					<div class="form-check">
						<input type="radio" class="form-check-input" name="example" id="exampleApple">
						<label for="exampleApple"  class="form-check-label">apple</label>
					</div>
					<div class="form-check">
						<input type="radio" class="form-check-input" name="example" id="exampleOrange">
						<label for="exampleOrange"  class="form-check-label">orange</label>
					</div>
				</fieldset>
				<hr class="my-4">

				<div class="form-group row">
					<label for="" class="col-sm-2 col-form-label">Tag</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" placeholder="xx tag">
					</div>
				</div>

				<div class="form-group row">
					<label for="" class="col-sm-2 col-form-label">Time</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" readonly value="2018/03/25">
					</div>
				</div>

				<div class="from-group mt-5">
					<button class="btn btn-primary mr-3">Modify</button>
					<button class="btn btn-danger">View the results</button>
				</div>
			</form>
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