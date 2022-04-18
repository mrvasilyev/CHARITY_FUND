//Код для Pipedream workflow Fund Form

const config = require('../config/config')
const { YooCheckout } = require('@a2seven/yoo-checkout')

//New system for payment by Yoo
const yooCheckout = new YooCheckout({
  shopId: config.shopId,
  secretKey: config.secretKey
})

var moment = require('moment');
moment.locale('ru');

let statusConvert = {
  pending: 'Платеж создан',
  succeeded: 'Платеж успешно завершен',
  canceled: 'Платеж отменен',
}
let payment_method = {
  bank_card: 'Банковская карта',
  apple_pay: 'Apple Pay',
  google_pay: 'Google Pay',
  yandex_money: 'Яндекс.Деньги',
  qiwi: 'QIWI Кошелек',
  webmoney: 'Webmoney',
  wechat: 'WeChat',
  sberbank: 'Сбербанк Онлайн',
  alfabank: 'Альфа-Клик',
  tinkoff_bank: 'Тинькофф',
  b2b_sberbank: 'Сбербанк Бизнес Онлайн',
  mobile_balance: 'Баланс телефона',
  cash: 'Наличные',
  installments: 'Заплатить по частям'
}
let month, year, shortYM, expDate, nextPaymentDate, nextPaymentID, paymentToTransaction,
  statusForTransaction, output, cartNumber
let paidStatus = 'Не оплачен'
let paymentSaved = 'Не сохранен'
let upload = {}
let arrayOfStep = []

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

function paymentDate(date, format) {
  let day = parseInt(moment(date, format).format('DD'))
  let month = parseInt(moment(date, format).format('MM')) + 1
  let year = moment(date, format).format('YYYY')
  if (day <= 15) {
    return moment(`10.${month}.${year}`, 'DD.MM.YYYY').format('YYYY-MM-DD')
  } else {
    return moment(`20.${month}.${year}`, 'DD.MM.YYYY').format('YYYY-MM-DD')
  }
}

let arrayPayments = steps.airtable_list_records.$return_value.records
for (let i = 0; i < arrayPayments.length; i++) {
  let status = arrayPayments[i].fields['Статус платежа']
  let paymentID = arrayPayments[i].fields['ID платежа']
  let paymentType = arrayPayments[i].fields['Тип пожертвования']
  let transactionID = arrayPayments[i].id
  if (status === 'Платеж создан') {
    try {
      const result = await YooCheckout.getPayment(paymentID)
      console.log(result)
      if (!result.paid) {
        statusForTransaction = await findValue(statusConvert, result.status)
        upload =
        {
          id: transactionID,
          fields: {
            'ID платежа': paymentID,
            'Стасус оплаты': paidStatus,
            'Статус платежа': statusForTransaction,
            'Способ оплаты сохранен': paymentSaved,
          }
        }
        arrayOfStep.push(upload)
      } else {
        month = result.payment_method.card.expiry_month
        year = result.payment_method.card.expiry_year
        shortYM = year + month
        expDate = moment(shortYM).endOf("month").format("YYYY-MM-DD")
        if (paymentType === 'Ежемесячное') {
          nextPaymentDate = await paymentDate(result.created_at)
          nextPaymentID = result.payment_method.id
        }
        paymentToTransaction = await findValue(payment_method, result.payment_method.type)
        statusForTransaction = await findValue(statusConvert, result.status)
        cartNumber = 'XXXX XXXX XXXX' + result.payment_method.card.last4
        if (result.paid) {
          paidStatus = 'Оплачен'
        }
        if (result.payment_method.saved) {
          paymentSaved = 'Сохранен'
        }
        upload =
        {
          id: transactionID,
          fields: {
            'ID платежа': paymentID,
            'ID для повторного списания': nextPaymentID,
            'Стасус оплаты': paidStatus,
            'Способ оплаты сохранен': paymentSaved,
            'Статус платежа': statusForTransaction,
            'Сумма поступления': parseFloat(result.income_amount.value),
            'Метод оплаты': paymentToTransaction,
            'Номер карты': cartNumber,
            'Тип карты': result.payment_method.card.card_type,
            'Действует до': expDate,
            'Дата (строка)': nextPaymentDate,
            'РРН': parseInt(result.authorization_details.rrn),
            'Код авторизации': parseInt(result.authorization_details.auth_code)
          }
        }
        arrayOfStep.push(upload)
      }
    } catch (err) {
      return err
    }

  }
}
if (arrayOfStep.length > 0) {
  output = JSON.stringify(arrayOfStep, null, 2)
  // console.log(output)
  return output
} else {
  $end("Нет данных для передачи в CRM")
}
Le
