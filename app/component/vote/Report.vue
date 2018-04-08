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
			<li class="breadcrumb-item active">Result: {{voteId}}</li>
		</ol>
	</nav>

	<h3>Result: vote title</h3>
	<hr>

	<div class="container">
		<h4>1. Question ... ?</h4>
		<chart-column :series="[{
			type: 'bar',
			data: [42.4, 33.2, 34.5],
		}]"
	:xAxis="{ categories: ['Option 1', 'Option 2', 'Option 3']}"
	:yAxis="[{
		labels: {
			format: '{value}'
		}
	}]"
	></chart-column>

		<button type="button"
			class="btn btn-success btn-lg"
			@click="$router.go(-1)">Back</button>

	</div>


</div>
</template>

<script>
export default {
	name: 'vote-report',
	computed: {
		voteId() {
			return this.$route.params.id;
		}
	}
}
</script>
