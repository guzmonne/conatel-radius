'use strict'

const LocalStrategy = require('passport-local').Strategy
const db = require('./db')
const bcrypt = require('bcrypt-nodejs')

module.exports = passport => {
  /**
   * Passport session setup
   */
  // Required to serialize the user for the session.
  passport.serializeUser((user, done) => done(null, user.id))
  // Required to deserialize the user.
  passport.deserializeUser((id, done) => 
    db('users')
    .select()
    .where({id})
    .then(rows => done(null, rows[0]))
    .catch(err => done(err))
  )
  /**
   * Local Signup
   */
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    // Find a user whose email is the same as the forms email.
    // We are checking to see if the user trying to login already exists.
    db('users')
    .select()
    .where({username})
    .then(rows => {
      if (rows.length > 0)
        return done(null, false)
      // Since there is no user with that username we create it.
      const user = {
        username,
        password: bcrypt.hashSync(password, null, null)
      }
      return db('users')
      .insert(user)
      .then(id => {
        user.id = id
        return done(null, user)
      })
    })
    .catch(err => done(err))
  }))
  /**
   * Local Login
   */
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    db('users')
    .select()
    .where({username})
    .then(rows => {
      const user = rows[0]
      if(!user)
        return done(null, false)
      // Check the validity of the password.
      if (!bcrypt.compareSync(password, user.password))
        return done(null, false)
      // Return the user if the result is successful.
      delete user.password
      return done(null, user)
    })
    .catch(err => done(err))
  }))
}