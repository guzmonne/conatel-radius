'use strict'

const Promise = require('bluebird')
const api = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt-nodejs')
const radius = require('./radius.js')
const local = require('./db.js')
/**
 * Sets the query variables sent from the client.
 * @param {Object} db     Knex connection to database.
 * @param {String} table  Table name.
 * @param {Array}  select List of columns to include.
 * @param {Object} req    Express request object.
 * @param {Object} res    Express response object.
 * @return {Object} Knex select call to database.
 */
const getIndexDbCall = (db, table, select, req, res) => {
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
  return dbCall
}
/**
 * Runs the dbCall and returns the result.
 * @param {Object} dbCall Knex select call to db.
 * @param {Object} req    Express request object.
 * @param {Object} res    Express response object.
 */
const callIndex = (dbCall, req, res) => {
  dbCall
  .then(result => res.json(result))
  .catch(error => res.status(400).json({error: error.message}))
}
/**
 * Default index call to database
 * @param {Object} db     Knex connection to database.
 * @param {String} table  Table name.
 * @param {Array}  select List of columns to include.
 * @param {Object} req    Express request object.
 * @param {Object} res    Express response object.
 * @return {Promise} Knex promise request to database.
 */
const index = (db, table, select, req, res) => {
  const dbCall = getIndexDbCall(db, table, select, req, res)
  // Execute db call.
  return callIndex(dbCall, req, res)
}

const create = (db, table, values, requiredKeys, req, res) => {
  requiredKeys || (requiredKeys = [])
  const body = _.pick(req.body, values)
  _.each(requiredKeys, key => {
    if(!_.has(body, key)) 
      return res.status(400).json({error: `${key} is required`})
  })
  db(table)
  .insert(body)
  .then(ids => {
    body.id = ids[0]
    res.json(body)
  })
  .catch(err => res.status(400).json({error: err.message}))
}
/**
 * Gets the user from the req object. Responds with an error if the
 * username or the password is invalid.
 * @param  {Object} req  Express req object.
 * @param  {Object} res  Express res object.
 * @return {Object} User object.
 */
const getAdmin = (req, res) => {
  const user = _.pick(req.body, 'username', 'password', 'email', 'phone')
  if (!user.username)
    return res.status(400).json({error: '"username" can\'t be undefined'})
  if (!user.password)
    return res.status(400).json({error: '"password" can\'t be undefined'})
  return user
}
/**
 * Sets the id and the created and updated values on the user.
 * @param  {Number} id   User id.
 * @param  {Object} user Current user object.
 * @return {Object} Modified user object.
 */
const setUser = (id, user) => {
  const date = new Date()
  user || (user = {})
  user.id = id
  user.createdAt = date
  user.updatedAt = date
  if (user.password)
    delete user.password
  return user
}
/** RADPOSTAUTH */
const radpostauthFields = ['authdate', 'id', 'reply', 'username']
api.get('/radpostauth', index.bind(null, radius, 'radpostauth', radpostauthFields))
/** RADCHECK */
api.get('/radcheck', index.bind(null, radius, 'radcheck', null))
/** NAS */
const nasFields = ['nasname', 'shortname', 'secret', 'description']
const requiredNasFields = ['nasname']
api.get('/nas', index.bind(null, radius, 'nas', null))
api.post('/nas', create.bind(null, radius, 'nas', nasFields, requiredNasFields))
/** ADMINS */
const adminsFields = ['username', 'email', 'id', 'phone', 'createdAt', 'updatedAt']
api.get('/admins', (req, res) => {
  const dbCall = getIndexDbCall(local, 'admins', null, req, res)
  .join('user_roles', 'admins.id', '=', 'user_roles.userid')
  .select(adminsFields.map(f => 'admins.' + f).concat('user_roles.role'))
  // Execute the db call
  callIndex(dbCall, req, res)
})
api.post('/admins', (req, res) => {
  let admin = getAdmin(req, res)
  const role = req.body.role
  local.transaction(trx => local
    .select()
    .where({username: admin.username})
    .from('admins')
    .transacting(trx)
    .then(rows => { // Gets possible existing admins from db.
      // If rows is not empty then the user exists.
      if (rows.length > 0)
        throw new Error('"username" already exists')
      // Else we continue with the user creation.
      admin.password = bcrypt.hashSync(admin.password, null, null)
      return local.insert(admin).into('admins').transacting(trx)
    })
    .then(ids => { // User insert successful.
      const id = ids[0]
      admin = setUser(id, admin)
      // Add the admin role to the db. The role is taken from req.
      return local.insert({userid: id, role: role}).into('user_roles').transacting(trx)
    })
    .then(trx.commit)
    .catch(trx.rollback)
  )
  .then(inserts => {
    console.log(inserts.length + ' user(s) saved.')
    admin.role = role
    res.json(admin)
  })
  .catch(error => {
    console.log('An error occurred inside the admin creation transaction')
    console.log(error.message)
    res.status(400).json({error: error.message})
  })
})
/** SSID */
const ssidsFields = ['name', 'vendor']
const requiredSsidsFields = []
api.get('/ssid', index.bind(null, local, 'ssids', null))
api.post('/ssid', create.bind(null, local, 'ssids', ssidsFields, requiredSsidsFields))

exports = module.exports = api
