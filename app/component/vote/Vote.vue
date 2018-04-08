<template>

<div>
	<nav>
		<ol class="breadcrumb mb-4">
			<li class="breadcrumb-item">
				<router-link tag="a" to="/">Home</router-link>
			</li>
			<li class="breadcrumb-item active">Vote</li>
		</ol>
	</nav>

	<div class="row">
		<div class="col-1">
			<router-link tag="a"
				to="add-vote"
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

	<h3 class="mt-4">All votes</h3>
	<hr>

	<ul class="nav nav-tabs">
		<li class="nav-item">
			<a @click="voteIsPulished=true"
				class="nav-link active">Published</a>
		</li>
		<li class="nav-item">
			<a @click="voteIsPulished=false"
				class="nav-link">Unpublished</a>
		</li>
	</ul>

	<table class="table mt-3 tex-center" v-if="voteIsPulished">
		<thead>
			<tr>
				<th>Title</th>
				<th>Created at</th>
				<th>Expired time</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>

	<table class="table mt-3 text-center" v-else>
		<thead>
			<tr>
				<th>Title</th>
				<th>Created at</th>
				<th>Last modified</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tbody>
	</table>
	
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'vote',
	data() {
		return {
			voteList: [],
			voteIsPulished: true,
		}
	},
	methods: {
		getVoteDetailById(id) {
			this.$router.push(`vote/${id}/detail`);
		},
		getVoteList(param) {
			return axios.get(`/api/ufwd/service/vote?${param}`)
				.then(res => {
					this.voteList = res.data.data;
				})
		},
	},
	// mounted() {
	// 	this.getVoteList('published=true');
	// }
}
</script>
