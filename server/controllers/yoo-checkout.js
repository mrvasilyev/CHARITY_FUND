const { YooCheckout } = require('@a2seven/yoo-checkout')
const request = require('request')
const axios = require('axios')
const { response } = require('express')
const config = require('../config/config')
const { v4: uuidv4 } = require('uuid')

//New system for payment by Yoo
const yooCheckout = new YooCheckout({ 
	shopId: config.shopId, 
	secretKey: config.secretKey 
})

// Old system for payment
// const yandexCheckout = require('yandex-checkout')({
// 	shopId: config.shopId,
// 	secretKey: config.secretKey,
// })

exports.create_payment = (req, res, next) => {
	var data = req.body
	console.log('exports.test -> data', data)
	var idempotenceKey = uuidv4()
	yooCheckout
		.createPayment(data, idempotenceKey)
		.then(function (result) {
			let response = result
			console.log('exports.create_payment -> response', response)
			res
				.status(200)
				.json({
					payment_id: response.id,
					user_id: response.description,
					status: response.status,
					confirmation_token: response.confirmation.confirmation_token,
				})
		})
		.catch(function (err) {
			console.error(err)
		})
}
