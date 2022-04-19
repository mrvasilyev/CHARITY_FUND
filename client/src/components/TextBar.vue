<template>
	<div>
		<div v-show="!route">
			<h1 class="text-xs px-4 mt-2">
				Даже небольшое регулярное пожертвование поможет нашей работе
			</h1>
		</div>
		<div v-show="route">
			<h1 class="text-xs px-4 mt-2">
				Спасибо! Полученные средства будут направлены на целевые программы фонда
			</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TextBar',
	data() {
		return {
			route: false,
		}
	},
	watch: {
		$route() {
			if (this.$router.currentRoute.path === '/step5') {
				this.route = true
			}
		},
	},
}
</script>