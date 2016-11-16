'use strict'

const api = require('express').Router()
const radius = require('./radius.js')

const index = (table, select, req, res) => {
  // Get data from params
  const limit = req.query.limit
  const offset = req.query.offset
  const orderBy = req.query.orderBy
  // Initialize db call object.
  const dbCall = radius(table).select()
  // Modify call according to query params.
  if (limit) dbCall.limit(+limit)
  if (offset > 0) dbCall.offset(+offset)
  if (orderBy) dbCall.orderBy(orderBy)
  // Execute db call.
  dbCall.then(result => res.json(result))
}

api.get('/radpostauth', index.bind(null, 'radpostauth', ['authdate', 'id', 'reply', 'username']))
api.get('/radcheck', index.bind(null, 'radcheck', null))

exports = module.exports = api
