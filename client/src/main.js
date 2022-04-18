import Vue from 'vue'
import Cleave from 'cleave.js'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store'
import router from './router/router'
import LoadScript from 'vue-plugin-load-script'

Vue.config.productionTip = false
Vue.use(LoadScript)

Vue.directive('cleave', {
	inserted: (el, binding) => {
		el.cleave = new Cleave(el, binding.value || {})
	},
	update: el => {
		const event = new Event('input', { bubbles: true })
		setTimeout(function() {
			el.value = el.cleave.properties.result
			el.dispatchEvent(event)
		}, 100)
	},
})

Vue.directive('focus', {
	inserted: el => {
		el.focus()
	},
})

new Vue({
	render: h => h(App),
	store,
	router,
}).$mount('#app')
