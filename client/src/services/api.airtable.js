import axios from 'axios'
const config = require('../config/config')

export default () => {
  return axios.create({
    baseURL: 'https://api.airtable.com/v0/appNesbiXEjMUN97s/',
    headers: {
      'Authorization': config.secretKey,
      'Content-Type': 'application/json'

    }
  })
}
