<template>
	<div id="app">
		<div class="container top-auto left-auto m-auto">
			<div class="container mt-0 px-3 pb-24">
				<div class="flex items-center justify-center w-auto">
					<div class="text-center text-gray-800 px-3">
						<div>
							<img
								class="m-auto"
								src="https://3.bp.blogspot.com/-D2ig0Qalxw4/WZ6arXqJMaI/AAAAAAAAB4o/RVgwRi8KRcci1l2nUbvyNFNsdU1amB9qgCLcBGAs/s400/cute-book-reading-girl-on-chair-animated-gif.gif"
								width="30%"
							/>
							<h1 class="text-xl mt-2">Благотворительный фонд школы</h1>
							<h1 class="text-xs px-4 mt-2">Даже небольшое регулярное пожертвование поможет нашей работе</h1>
						</div>
						<steps-bar></steps-bar>
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import stepsBar from '@/components/StepsBar'

export default {
	name: 'App',
	data() {
		return {}
	},
	components: {
		stepsBar,
	},
}
</script>

<style>
#app {
	font-family: ProximaNova, -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 15px;
	font-weight: normal;
	line-height: 1.5;
	-webkit-text-size-adjust: 100%;
	background: #fff;
	color: #666;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
}
</style>
