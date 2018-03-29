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
		<div class="col-10">
			<form>
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
			</form>
		</div>
	</div>

	<h4>Options</h4>
	<hr>

	<div class="row">
		<div class="col-10">
			<form>
				<div class="form-group">
					<label for="">Option1</label>
					<input
						type="text"
						class="form-control">
				</div>
			</form>

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
