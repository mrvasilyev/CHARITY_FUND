import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		RESULT_PAGE_1: {
			type: '',
			sum: 0,
		},
		RESULT_PAGE_2: {
			id: '',
			name: '',
			surname: '',
			email: '',
			phone: '',
			bdata: '',
			checkboxes: {},
			checksum: '',
		},
		STEP_2: false,
		STEP_3: false,
		STEP_4: false,
		PAYMENT_TOKEN: {
			payment_id: '',
			user_id: '',
			sum: 0,
			type: '',
			status: '',
			confirmation_token: ''
		},
	},
	mutations: {
		SET_RESULT_PAGE_1: (state, payload) => {
			state.RESULT_PAGE_1 = payload
		},
		SET_RESULT_PAGE_2: (state, payload) => {
			state.RESULT_PAGE_2 = payload
		},
		SET_STEP_2: state => {
			state.STEP_2 = !state.STEP_2
		},
		SET_STEP_3: state => {
			state.STEP_3 = !state.STEP_3
		},
		SET_STEP_4: state => {
			state.STEP_4 = !state.STEP_4
		},
		SET_PAYMENT_TOKEN: (state, payload) => {
			state.PAYMENT_TOKEN = payload
		},
	},
	actions: {
		SET_RESULT_PAGE_1: (context, payload) => {
			context.commit('SET_RESULT_PAGE_1', payload)
		},
		SET_RESULT_PAGE_2: (context, payload) => {
			context.commit('SET_RESULT_PAGE_2', payload)
		},
		SET_STEP_2: context => {
			context.commit('SET_STEP_2')
		},
		SET_STEP_3: context => {
			context.commit('SET_STEP_3')
		},
		SET_STEP_4: context => {
			context.commit('SET_STEP_4')
		},
		SET_PAYMENT_TOKEN: (context, payload) => {
			context.commit('SET_PAYMENT_TOKEN', payload)
		},
	},
	getters: {
		RESULT_PAGE_1: state => {
			return state.RESULT_PAGE_1
		},
		RESULT_PAGE_2: state => {
			return state.RESULT_PAGE_2
		},
		STEP_2: state => {
			return state.STEP_2
		},
		STEP_3: state => {
			return state.STEP_3
		},
		STEP_4: state => {
			return state.STEP_4
		},
		PAYMENT_TOKEN: state => {
			return state.PAYMENT_TOKEN
		},
	},
})

export default store
