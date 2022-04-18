import Vue from 'vue'
import Router from 'vue-router'

import Step_1 from '../components/Step1'
import Step_2 from '../components/Step2'
import Step_3 from '../components/Step3'
import Step_4 from '../components/Step4'
import NotFound from '../components/NotFound'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '/',
			name: 'step_1',
			component: Step_1,
			props: true,
		},
		{
			path: '/step2',
			name: 'step_2',
			component: Step_2,
			props: true,
		},
		{
			path: '/step3',
			name: 'step_3',
			component: Step_3,
			props: true,
		},
		{
			path: '/step4',
			name: 'step_4',
			component: Step_4,
			props: true,
		},
		{ path: '/404', component: NotFound },
		{ path: '*', redirect: '/' },
	],
})

router.replace({ path: '/', redirect: '/step2' })

export default router
