import api from '@/services/api.airtable'

export default {
	post(endpoint, result) {
		return api().post(endpoint, result)
	},
	patch(endpoint, result) {
		return api().patch(endpoint, result)
	},
	get(endpoint) {
		return api().get(endpoint)
	}
}
