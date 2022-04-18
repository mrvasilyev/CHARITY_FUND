<template>
	<div class="flex flex-col mt-4 min-w-full">
		<!-- Имя жертвователя (обязательное) -->
		<div class="relative block bg-gray-300 mb-2 cursor-auto">
			<div
				class="block text-left opacity-75 label-class absolute text-red-600"
				for="firstname"
				:class="{
					'edit-input opacity-75 z-20': this.editName || this.name !== '',
				}"
				v-if="this.errors[0] && this.name.length <= 2"
			>
				{{ this.errors[0] }}
			</div>
			<div
				class="block text-left opacity-50 label-class absolute"
				for="firstname"
				:class="{
					'edit-input opacity-75 z-20': this.editName || this.name !== '',
				}"
				v-else
			>
				Ваше имя
			</div>
			<input
				class="
					w-full
					bg-transparent
					outline-none
					border-none
					block
					relative
					z-10
					px-2
					pt-6
					pb-2
					text-lg
				"
				type="text"
				required
				name="firstname"
				ref="name"
				v-model="name"
				@focus="editName = true"
				@blur="editName = false"
				autocomplete="given-name"
			/>
		</div>
		<!-- Имя жертвователя (обязательное) -->

		<!-- Фамилия жертвователя (обязательное) -->
		<div class="relative block bg-gray-300 mb-2 cursor-auto">
			<div
				class="block text-left opacity-75 label-class absolute text-red-600"
				for="lastname"
				:class="{
					'edit-input opacity-75 z-20': this.editSurname || this.surname !== '',
				}"
				v-if="this.errors[1] && this.surname.length <= 2"
			>
				{{ this.errors[1] }}
			</div>
			<div
				class="block text-left opacity-50 label-class absolute"
				for="lastname"
				:class="{
					'edit-input opacity-75 z-20': this.editSurname || this.surname !== '',
				}"
				v-else
			>
				Ваша фамилия
			</div>

			<input
				class="
					w-full
					bg-transparent
					outline-none
					border-none
					block
					relative
					z-10
					px-2
					pt-6
					pb-2
					text-lg
				"
				type="text"
				required
				name="lastname"
				ref="surname"
				v-model="surname"
				@focus="editSurname = true"
				@blur="editSurname = false"
				autocomplete="family-name"
			/>
		</div>
		<!-- Фамилия жертвователя (обязательное) -->

		<!-- Email жертвователя (обязательное) -->
		<div class="relative block bg-gray-300 mb-2 cursor-auto">
			<div
				class="block text-left opacity-75 label-class absolute text-red-600"
				for="email"
				:class="{
					'edit-input opacity-75 z-20': this.editEmail || this.email !== '',
				}"
				v-if="this.errors[2]"
			>
				{{ this.errors[2] }}
			</div>
			<div
				class="block text-left opacity-50 label-class absolute"
				for="email"
				:class="{
					'edit-input opacity-75 z-20': this.editEmail || this.email !== '',
				}"
				v-else
			>
				E-mail
			</div>

			<input
				class="
					w-full
					bg-transparent
					outline-none
					border-none
					block
					relative
					z-10
					px-2
					pt-6
					pb-2
					text-lg
				"
				type="text"
				required
				name="email"
				ref="email"
				v-model="currentEmail"
				@focus="editEmail = true"
				@blur="editEmail = false"
				autocomplete="email"
			/>
		</div>
		<!-- Email жертвователя (обязательное) -->

		<!-- Телефон жертвователя-->
		<div class="relative block bg-gray-300 mb-2 cursor-auto">
			<div
				class="block text-left opacity-75 label-class absolute text-red-600"
				for="lastname"
				:class="{
					'edit-input opacity-75 z-20': this.editPhone || this.phone !== '',
				}"
				v-if="this.errors[3]"
			>
				{{ this.errors[3] }}
			</div>
			<div
				class="block text-left opacity-50 label-class absolute"
				for="phone"
				:class="{
					'edit-input opacity-75 z-20': this.editPhone || this.phone !== '',
				}"
				v-else
			>
				Телефон (это важно)
			</div>

			<input
				class="
					w-full
					bg-transparent
					outline-none
					border-none
					block
					relative
					z-10
					px-2
					pt-6
					pb-2
					text-lg
				"
				type="tel"
				name="phone"
				ref="phone"
				id="phone"
				v-model="currentPhone"
				@focus="editPhone = true"
				@blur="editPhone = false"
				autocomplete="no"
			/>
		</div>
		<!-- Телефон жертвователя-->

		<!-- Дата рождения жертвователя-->
		<div class="relative block bg-gray-300 mb-2 cursor-auto">
			<div
				class="block text-left opacity-75 label-class absolute text-red-600"
				for="lastname"
				:class="{
					'edit-input opacity-75 z-20': this.editBday || this.bday !== '',
				}"
				v-if="this.errors[4]"
			>
				{{ this.errors[4] }}
			</div>
			<div
				class="block text-left opacity-50 label-class absolute"
				for="bday"
				:class="{
					'edit-input opacity-75 z-20': this.editBday || this.bday !== '',
				}"
				v-else
			>
				Дата рождения (мы поздравим!)
			</div>

			<input
				class="
					w-full
					bg-transparent
					outline-none
					border-none
					block
					relative
					z-10
					px-2
					pt-6
					pb-2
					text-lg
				"
				type="text"
				name="bday"
				ref="bday"
				id="bday"
				v-model="currentData"
				@focus="editBday = true"
				@blur="editBday = false"
				autocomplete="no"
			/>
		</div>
		<!-- Дата рождения жертвователя-->

		<!-- Чек-бокс с Днем Рождения -->
		<AgreeBox
			text="Разрешаю поздравлять меня с днем рождения"
			:checkbox="this.checkBoxData"
			:name="Object.keys(this.checkboxes)[0]"
			@boxenable="boxStatus"
		></AgreeBox>
		<!-- Чек-бокс с Днем Рождения -->

		<!-- Чек-бокс наши доноры -->
		<AgreeBox
			text="Разрешаю опубликовать мое имя и фамилию в разделе"
			:checkbox="true"
			:name="Object.keys(this.checkboxes)[1]"
			@boxenable="boxStatus"
			:link="true"
			:linktext="['«Наши доноры»']"
		></AgreeBox>
		<!-- Чек-бокс наши доноры -->

		<!-- Чек-бокс рассылка -->
		<AgreeBox
			text="Хочу получать рассылку школы"
			:checkbox="true"
			:name="Object.keys(this.checkboxes)[2]"
			@boxenable="boxStatus"
		></AgreeBox>
		<!-- Чек-бокс рассылка -->

		<div class="min-w-full border-b border-gray-300 mb-2"></div>

		<!-- Чек-бокс согласие -->
		<AgreeBox
			text="Согласен с "
			:checkbox="true"
			:name="Object.keys(this.checkboxes)[3]"
			@boxenable="boxStatus"
			:link="true"
			:linktext="['офертой ', ' политикой обработки персональных данных']"
		></AgreeBox>
		<!-- Чек-бокс согласие -->

		<!--Кнопка "Продолжить"-->
		<button
			class="
				flex
				h-16
				bg-gray-400
				text-white
				px-3
				mt-4
				text-left
				justify-between
				items-center
				cursor-pointer
				focus:outline-none
				min-w-full
			"
			@click="
				checkAndSubmit({ name: 'step_3' })
			"
			:class="{
				'bg-gray-800':
					this.name &&
					this.surname &&
					this.validEmail(this.email) &&
					this.errors[3] === '' &&
					this.errors[4] === '' &&
					this.checkboxes.secagree,
			}"
			ref="next"
			:disabled="!isComplete"
		>
			<h1>Продолжить</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#ffffff"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M5 12h13M12 5l7 7-7 7" />
			</svg>
		</button>
		<!--Кнопка "Продолжить"-->

		<loading
			:active.sync="visible"
			:can-cancel="false"
			:height="40"
			:width="40"
			:opacity="0.4"
		></loading>

		<!--Кнопка "Назад"-->

		<router-link :to="{ name: 'step_1' }">
			<button
				class="mt-4 cursor-pointer text-sm text-blue-900 p-0 h-12 outline-none"
			>
				Назад
			</button>
		</router-link>

		<!--Кнопка "Назад"-->

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
import Inputmask from 'inputmask'
import moment from 'moment'
import crypto from 'crypto'
import AgreeBox from '../components/AgreeBox'
import sendDataService from '@/services/sendData'
import _ from 'lodash'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
	name: 'Step2',
	data() {
		return {
			errors: ['', '', '', '', ''],
			name: '',
			surname: '',
			email: '',
			phone: '',
			bday: '',
			pubAgree: false,
			editName: false,
			editSurname: false,
			editEmail: false,
			editPhone: false,
			editBday: false,
			checkBoxData: false,
			currentEmail: '',
			currentPhone: '',
			currentData: '',
			checkboxes: {
				bdagree: false,
				pubagree: false,
				subsagree: false,
				secagree: false,
			},
			visible: false,
		}
	},
	mounted() {
		let phone = document.getElementById('phone')
		Inputmask('+7 (999) 999-99-99', { showMaskOnHover: false }).mask(phone)
		let bday = document.getElementById('bday')
		Inputmask('99.99.9999', { showMaskOnHover: false }).mask(bday)
	},
	computed: {
		...mapGetters(['RESULT_PAGE_1', 'RESULT_PAGE_2', 'STEP_2']),

		isComplete() {
			return this.checkboxes.secagree
		},
	},
	methods: {
		...mapActions([
			'SET_RESULT_PAGE_1',
			'SET_RESULT_PAGE_2',
			'SET_STEP_2',
			'SET_STEP_3',
		]),

		async cryptoData(name, surname, email) {
			let checksum = await crypto
				.createHash('md5')
				.update(name + surname + email)
				.digest('Hex')
			return checksum
		},

		async responseID() {
			let data = (await sendDataService.get('Customers')).data
			return data
		},
		//DONE:˝
		findID(data, checksum) {
			if (data.records.length !== 0) {
				for (let i = 0; i < data.records.length; i++) {
					let dbChecksum = data.records[i].fields.CheckSum

					if (checksum === dbChecksum) {
						return data.records[i].id
					}
				}
				return null
			} else {
				return null
			}
		},

		async sendData() {
			//Comparing two arrays and update CRM
			function checkData(obj_1, obj_2) {
				delete obj_1.fields['Transactions']
				let fields_1 = Object.keys(obj_1.fields)
				let fields_2 = Object.keys(obj_2.records[0].fields)
				if (fields_2.length !== fields_1.length) {
					let result = _.omit(obj_2.records[0].fields, fields_1)
					return result
				}
			}

			try {
				let checksum = await this.cryptoData(
					this.name,
					this.surname,
					this.email
				)
				let checkDataByID = ''
				let updateData = ''
				let responseID = await this.responseID()
				let dbID = await this.findID(responseID, checksum)

				//DEBUG:
				// console.log(responseID)
				// console.log(checksum)
				// console.log(dbID)

				let record = {
					records: [
						{
							fields: {
								Имя: this.name,
								Фамилия: this.surname,
								'E-mail': this.email,
								Телефон: this.phone,
								'Дата рождения': this.bday,
								Офферта: this.checkboxes.secagree,
								Поздравление: this.checkboxes.bdagree,
								Рассылка: this.checkboxes.subsagree,
								Публикация: this.checkboxes.pubagree,
								CheckSum: checksum,
							},
						},
					],
				}

				//FIXME:
				if (dbID === null && checksum !== 'd41d8cd98f00b204e9800998ecf8427e') {
					let data = (await sendDataService.post('Customers', record)).data
					if (data.records.length - 1 == 0) {
						let id = data.records[0].id
						//DEBUG:
						//console.log(id)
						return id
					}
					//FIXME:
				} else if (
					dbID !== null &&
					checksum !== 'd41d8cd98f00b204e9800998ecf8427e'
				) {
					checkDataByID = (await sendDataService.get(`Customers/${dbID}`)).data

					updateData = {
						records: [
							{
								id: dbID,
								fields: { ...checkData(checkDataByID, record) },
							},
						],
					}

					let data = (await sendDataService.patch('Customers', updateData)).data
					if (data.records.length - 1 == 0) {
						let id = data.records[0].id
						//DEBUG:
						//console.log(id)
						return id
					}
				}
			} catch (error) {
				console.log('error', error)
			}
		},

		async checkAndSubmit(route) {
			this.visible = true
			let checksum = await this.cryptoData(this.name, this.surname, this.email)
			let id = await this.sendData()
			if (
				this.name &&
				this.surname &&
				this.validEmail(this.email) &&
				this.validPhone(this.phone) !== false &&
				this.validDate(this.bday) !== false &&
				this.checkboxes.secagree
			) {
				let payload = {
					name: this.name,
					surname: this.surname,
					email: this.email,
					phone: this.phone,
					bdata: this.bday,
					checkboxes: { ...this.checkboxes },
					checksum: checksum,
					id: id,
				}

				this.$store.dispatch('SET_RESULT_PAGE_2', payload)
				// this.$store.dispatch('SET_STEP_3')
				this.$router.push(route)
			}

			this.errors = ['', '', '', '', '']

			if (!this.name || this.name.length <= 2) {
				this.errors.splice(0, 1, 'Введите ваше имя')
			}
			if (!this.surname) {
				this.errors.splice(1, 1, 'Введите вашу фамилию')
			}
			if (!this.email) {
				this.errors.splice(2, 1, 'Неправильный e-mail')
			} else if (!this.validEmail(this.email)) {
				this.errors.splice(2, 1, 'Неправильный e-mail')
			}
			if (this.validPhone(this.phone) === false) {
				this.errors.splice(3, 1, 'Неправильный формат телефона')
			}
			if (!this.validDate(this.bday) && this.bday !== '') {
				this.errors.splice(4, 1, 'Неправильный формат даты')
			}

			// console.log(this.errors)
		},

		validEmail: function (email) {
			let re = /.+@.+\..+/i
			return re.test(email)
		},
		validPhone: function (phone) {
			if (phone) {
				let re = /\+7\s\(\d{3}\)\s(\d{3})\S(\d{2})\S(\d{2})/i
				return re.test(phone)
			}
		},
		validDate: function (bday) {
			if (bday) {
				let re = /\d{2}.\d{2}.\d{4}/gm
				let dtchkl = re.test(bday)
				let dtchk = moment(bday, 'DD.MM.YYYY').isValid()

				if (dtchkl && dtchk) {
					return true
				} else {
					return false
				}
			}
		},
		boxStatus: function (name, status) {
			this.checkboxes[name] = status
			if (name === 'secagree' && status) {
				this.$nextTick(function () {
					this.$refs.next.focus()
				})
			}
		},
	},
	watch: {
		currentEmail: function () {
			this.email = this.currentEmail
			this.errors.splice(2, 1, '')
		},
		currentPhone: function () {
			this.phone = this.currentPhone
			this.errors.splice(3, 1, '')
		},
		currentData: function () {
			this.bday = this.currentData
			this.errors.splice(4, 1, '')
			this.checkBoxData = this.validDate(this.bday)
		},
	},
	components: {
		AgreeBox: AgreeBox,
		Loading: Loading,
	},
}
</script>

<style>
.label-class {
	top: 18px;
	left: 8px;
	font-size: 20px;
	transition: transform 60ms ease-in-out 0s, font-size 60ms ease-in-out 0s;
}

@media screen and (max-width: 320px) {
	.label-class {
		top: 18px;
		font-size: 16px;
		transition: transform 60ms ease-in-out 0s, font-size 60ms ease-in-out 0s;
	}
}

.edit-input {
	top: 18px;
	font-size: 13px;
	transform: translate3d(0px, -12px, 0px);
}
</style>
