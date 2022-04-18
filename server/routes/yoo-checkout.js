const express = require('express')
const router = express.Router()
const testController = require('../controllers/yoo-checkout')

router.post('/', testController.create_payment)

module.exports = router
