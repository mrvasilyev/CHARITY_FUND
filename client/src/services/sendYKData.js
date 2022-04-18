import api from '@/services/yandex.kassa'

export default {
	post(endpoint, data) {
		return api().post(endpoint, data)
	},
	get(endpoint) {
		return api().get(endpoint)
	}
}
