'use strict'

exports = module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.NODE_ENV === 'production' ? 'mysql' : '0.0.0.0',
    user : 'radius',
    password : 'radpass',
    database : 'radius'
  }
});
