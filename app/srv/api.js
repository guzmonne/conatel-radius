'use strict'

const api = require('express').Router()
const radius = require('./radius.js')

api.get('/hello', (req, res) => {
  radius('radcheck').select().then(result => res.json({result}))
})

exports = module.exports = api
