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
			<li class="breadcrumb-item active">New vote</li>
		</ol>
	</nav>

	<h3>New vote</h3>
	<hr>

	<div class="row">
		<div class="col-6">
			<div class="card">
				<div class="card-header">Gentle</div>
				<div class="card-body">
					<div class="form-group">
						<label for="">Title</label>
						<input
							type="text"
							class="form-control">
					</div>
					<div class="form-group">
						<label for="">Question</label>
						<textarea
							type="text"
							class="form-control"></textarea>
					</div>
					<div class="form-group">
						<label for="">Rules</label>
						<input
							type="text"
							class="form-control">
					</div>
				</div>
			</div>

			<div class="card mt-3">
				<div class="card-header">
					Options
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="">Option 1</label>
						<div class="input-group">
							<input
								type="text"
								class="form-control">
							<div class="input-group-append">
								<button class="btn btn-secondary"
									type="button"><i class="fa fa-times"></i></button>
							</div>
						</div>
					</div>
					<button type="button"
						class="btn btn-success">New</button>
				</div>
			</div>

			<router-link tag="button"
				class="btn btn-primary btn-lg mt-3"
				to="/ufwd/survey/vote/1/detail">Create</router-link>
		</div>

		<div class="col-6">
			<div class="card">
				<div class="card-header">
					Preview vote
				</div>
				<div class="card-body">
					<h4>Title: xxx vote</h4>
					<hr>

					<h5>1. Question ... ?</h5>

					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
						<label class="form-check-label" for="defaultCheck1">
							Option 1
						</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="checkbox" value="" id="defaultCheck2">
						<label class="form-check-label" for="defaultCheck2">
							Option 2
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
export default {
	name: 'add-vote',
	data() {
		return {
			create: {
				title: '',
				type: '',
				startAt: '',
				endAt: '',
				options: [
					{
						value: ''
					}
				]
			},
			rules: {
				title: [
					{
						required: true,
						message: '请输入投票名称',
						trigger: 'blur'
					},
				]
			}
		}
	}
}
</script>
