<template>
	<div class="mt-8 mb-3 block">
		<div id="payment-form"></div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'Step4',
	computed: {
		...mapGetters([
			'RESULT_PAGE_1',
			'RESULT_PAGE_2',
			'STEP_2',
			'STEP_3',
			'STEP_4',
			'PAYMENT_TOKEN',
		]),
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
	},
	created() {
		this.$loadScript('https://yookassa.ru/checkout-widget/v1/checkout-widget.js')
			.then(() => {
				const confirmation_token =
				this.$store.getters.PAYMENT_TOKEN.confirmation_token
				const checkout = new window.YooMoneyCheckoutWidget({
					confirmation_token: confirmation_token, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
					return_url: 'http://localhost:8080/#/step5', //Ссылка на страницу завершения оплаты
					error_callback(error) {
						//Обработка ошибок инициализации
						console.log('error_callback -> error', error)
					},
				})
				checkout.render('payment-form')
			})
			.catch((error) => {
				console.log('created -> error', error)
			})
	},
}
</script>

<style>
</style>
