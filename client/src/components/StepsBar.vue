<template>
	<div v-show="!STEP_4">
		<div class="flex items-center justify-between mt-4 px-6">
			<div>
				<div
					class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-800 text-white m-auto"
				>1</div>
				<div class="flex items-center justify-center text-xs pt-1 text-center m-auto">Сумма</div>
			</div>
			<div>
				<div
					class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-500 text-white m-auto"
					:class="{'bg-gray-800': STEP_2}"
				>2</div>
				<div class="flex items-center justify-center text-xs pt-1 text-center m-auto">Контакты</div>
			</div>
			<div>
				<div
					class="flex items-center justify-center rounded-full h-10 w-10 bg-gray-500 text-white m-auto"
					:class="{'bg-gray-800': STEP_3}"
				>3</div>
				<div class="flex items-center justify-center text-xs pt-1 text-center m-auto">Оплата</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'StepsBar',
	computed: {
		...mapGetters([
			'RESULT_PAGE_1',
			'RESULT_PAGE_2',
			'STEP_2',
			'STEP_3',
			'STEP_4',
		]),
	},
	methods: {
		...mapActions([
			'SET_RESULT_PAGE_1',
			'SET_RESULT_PAGE_2',
			'SET_STEP_2',
			'SET_STEP_3',
			'SET_STEP_4',
		]),
	},
//DONE:
	watch: {
		$route(to, from) {
			if (to.name === 'step_1' && from.name === 'step_2') {
				this.$store.dispatch('SET_STEP_2')
			} else if (to.name === 'step_2' && from.name === 'step_1') {
				this.$store.dispatch('SET_STEP_2')
			}

			if (to.name === 'step_2' && from.name === 'step_3') {
				this.$store.dispatch('SET_STEP_3')
			} else if (to.name === 'step_3' && from.name === 'step_2') {
				this.$store.dispatch('SET_STEP_3')
			}
		},
	},
}
</script>

<style>
</style>
