'use strict'

exports = module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host : process.env.NODE_ENV === 'production' ? 'mysql' : 'localhost',
    user : 'conatel',
    password : 'C0n4t3l',
    database : 'local'
  }
});
