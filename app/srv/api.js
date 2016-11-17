'use strict'

const api = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt-nodejs')
const radius = require('./radius.js')
const local = require('./db.js')

const index = (db, table, select, req, res) => {
  // Get data from params
  const limit = req.query.limit
  const offset = req.query.offset
  const orderBy = req.query.orderBy
  // Initialize db call object.
  const dbCall = db(table).select(select)
  // Modify call according to query params.
  if (limit) dbCall.limit(+limit)
  if (offset > 0) dbCall.offset(+offset)
  if (orderBy) dbCall.orderBy(orderBy)
  // Execute db call.
  dbCall
  .then(result => res.json(result))
  .catch(error => res.json(error))
}

/** RADPOSTAUTH */
const radpostauthFields = ['authdate', 'id', 'reply', 'username']
api.get('/radpostauth', index.bind(null, radius, 'radpostauth', radpostauthFields))
/** RADCHECK */
api.get('/radcheck', index.bind(null, radius, 'radcheck', null))
/** USERS */
const usersFields = ['username', 'email', 'id', 'phone', 'createdAt', 'updatedAt']
api.get('/users', index.bind(null, local, 'users', usersFields))
api.post('/users', (req, res) => {
  const user = _.pick(req.body, 'username', 'password', 'email', 'phone')
  if (!user.username)
    return res.json({error: '"username" can\'t be undefined'})
  if (!user.password)
    return res.json({error: '"password" can\'t be undefined'})
  local('users')
  .select()
  .where({username: user.username})
  .then(rows => {
    if (rows.length > 0)
      return res.json({error: '"username" already exists'})
    // Since ther is no user with that same username we create it.
    user.password = bcrypt.hashSync(user.password, null, null)
    return local('users')
    .insert(user)
    .then(id => {
      user.id = id[0]
      const date = new Date()
      user.createdAt = date
      user.updatedAt = date
      delete user.password
      res.json(user)
    })
  })
  .catch(error => res.json({error}))
})

exports = module.exports = api
