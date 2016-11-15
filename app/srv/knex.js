'use strict'

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'mysql',
    user : 'radius',
    password : 'radpass',
    database : 'radius'
  }
});

exports = module.exports = knex
