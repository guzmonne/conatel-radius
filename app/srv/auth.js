'use strict'

const auth = require('express').Router()

exports = module.exports = passport => {
  const authHandler = (res, error, user) => {
    if (error) {
      res.json({error})
      return
    }
    if (user === false){
      res.json({error: {message: 'Invalid username or password', type: 'invalid'}})
      return
    }
    res.json(user)
  }
  /**
   * Login route
   */
  auth.post('/login', (req, res, next) => {
    passport.authenticate('local-login', authHandler.bind(this, res))(req, res, next)
  })
  /**
   * Signup route
   */
  auth.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', authHandler.bind(this, res))(req, res, next)
  })
  return auth
}