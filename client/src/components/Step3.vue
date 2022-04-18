<template>
	<div class="mb-3 block mt-8">
		<div class="bg-gray-300 text-center px-8 py-16">
			<div class="text-base mb-8 text-center break-words">
				{{ RESULT_PAGE_1.type }} пожертвование в размере {{ count }} руб.
			</div>
			<div
				class="
					bg-gray-800
					text-white
					relative
					flex
					justify-center
					items-center
					w-full
					max-w-lg
					h-16
					cursor-pointer
					mx-auto
				"
				@click.once="sendData({ name: 'step_4' })"
			>
				Оплатить картой
			</div>
		</div>

		<loading
			:active.sync="visible"
			:can-cancel="false"
			:height="40"
			:width="40"
			:opacity="0.8"
		></loading>

		<router-link :to="{ name: 'step_2' }">
			<button
				class="mt-4 cursor-pointer text-sm text-blue-900 p-0 h-12 outline-none"
			>
				Назад
			</button>
		</router-link>

		<!--Другие способы-->
		<div class="mt-8">
			<span
				class="
					mt-4
					cursor-pointer
					text-sm text-gray-800
					border-b border-gray-400
					w-auto
					p-0
				"
				>Другие способы пожертвования</span
			>
		</div>
		<!--Другие способы-->
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import sendDataService from '@/services/sendData'
import sendYandexService from '@/services/sendYKData'
// import crypto from 'crypto'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
// import _ from 'lodash'

export default {
	name: 'Step3',
	data() {
		return {
			customerID: {},
			visible: false,
		}
	},
	computed: {
		...mapGetters([
			'RESULT_PAGE_1',
			'RESULT_PAGE_2',
			'STEP_2',
			'STEP_3',
			'STEP_4',
			'PAYMENT_TOKEN',
		]),
		count() {
			let sum = this.$store.state.RESULT_PAGE_1.sum
			let result = String(sum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
			return result
		},
	},
	methods: {
		...mapActions([
			'SET_RESULT_PAGE_1',
			'SET_RESULT_PAGE_2',
			'SET_STEP_2',
			'SET_STEP_3',
			'SET_STEP_4',
			'SET_PAYMENT_TOKEN',
		]),

		async responseID() {
			let data = (await sendDataService.get('Customers')).data
			return data
		},

		async checkData() {
			let checksum = this.$store.state.RESULT_PAGE_2.checksum
			let responseID = await this.responseID()
			let dbID = await this.findID(responseID, checksum)
			return dbID
		},

		findID(data, checksum) {
			if (data.records.length !== 0) {
				for (let i = 0; i < data.records.length; i++) {
					const dbChecksum = data.records[i].fields.CheckSum
					if (checksum === dbChecksum) {
						return data.records[i].id
					}
				}
				return null
			} else {
				return null
			}
		},

		async sendData(route) {
			this.visible = true

			function findValue(obj, key) {
				let k, v
				for ([k, v] of Object.entries(obj)) {
					if (k == key) return v
					if (typeof v === 'object' && v !== null) {
						let found = findKey(v, key)
						if (found) return found
					}
				}
			}

			function findKey(obj, key) {
				let keysArray = Object.keys(obj)
				for (let i = 0; i < keysArray.length; i++) {
					if (key === keysArray[i]) {
						return true
					}
				}
			}

			function paymentType(type) {
				if (type === 'Ежемесячное') {
					return true
				} else {
					return false
				}
			}

			try {
				// Переменные
				let step_1 = this.$store.state.RESULT_PAGE_1
				let step_2 = this.$store.state.RESULT_PAGE_2

				// Приводим тип платежа к Boolean
				let type = paymentType(step_1.type)
				// Формируем JSON для Яндекс.Касса
				let data = {
					amount: {
						value: step_1.sum,
						currency: 'RUB',
					},
					confirmation: {
						type: 'embedded',
					},
					capture: true,
					description: step_2.id,
					receipt: {
						customer: {
							full_name: step_2.name + ' ' + step_2.surname,
							email: step_2.email,
						},
						type: 'payment',
						send: 'true',
						items: [
							{
								description: `${step_1.type} пожертвование`,
								quantity: '1.00',
								amount: {
									value: step_1.sum,
									currency: 'RUB',
								},
								vat_code: '1',
								payment_mode: 'full_prepayment',
								payment_subject: 'payment',
							},
						],
					},
					refundable: true,
					save_payment_method: type,
				}
				//DEBUG:
				//console.log(data)

				// Отправляем платеж в Яндекс.Кассу
				let payment = (await sendYandexService.post('test', data)).data

				//DEBUG:
				//console.log('sendData -> payment', payment)

				// Собираем данные для переменной во Vuex (под вопросом)
				let payload = {
					payment_id: payment.payment_id,
					user_id: payment.user_id,
					sum: step_1.sum,
					type: step_1.type,
					status: payment.status,
					confirmation_token: payment.confirmation_token,
				}

				let status = {
					pending: 'Платеж создан',
					succeeded: 'Платеж успешно завершен',
					canceled: 'Платеж отменен',
				}
				let statusForTransaction = findValue(status, payment.status)

				//DEBUG:
				//console.log('sendData -> statusForTransaction', statusForTransaction)

				// Собираем данные для таблицы транзакций
				let transaction = {
					records: [
						{
							fields: {
								Жертвователь: [payment.user_id],
								'Тип пожертвования': step_1.type,
								'Сумма пожертвования': step_1.sum,
								'Статус платежа': statusForTransaction,
								'ID платежа': payment.payment_id,
								'Стасус оплаты': 'Не оплачен',
							},
						},
					],
				}

				//DEBUG:
				//console.log('sendData -> transaction', transaction)

				let responseTransaction = (
					await sendDataService.post('Transactions', transaction)
				).data

				//DEBUG:
				//console.log('sendData -> responseTransaction', responseTransaction)

				// Собираем данные для таблицы подписок
				let subsctiption = {
					records: [
						{
							fields: {
								'ID платежа': payment.payment_id,
								'ID транзакции': [responseTransaction.records[0].id],
							},
						},
					],
				}

				//DEBUG:
				//console.log('sendData -> subsctiption', subsctiption)

				// Добавляем данные в таблицу Subsctiption
				if (type) {
					await sendDataService.post('Subscriptions', subsctiption)
				}

				this.$store.dispatch('SET_PAYMENT_TOKEN', payload)
				this.$store.dispatch('SET_STEP_4')
				this.$router.push(route)
			} catch (error) {
				console.log('error', error)
			}
		},
	},
	components: {
		Loading: Loading,
	},
}
</script>

<style>
</style>
