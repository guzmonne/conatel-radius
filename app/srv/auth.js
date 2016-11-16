'use strict'

const auth = require('express').Router()

exports = module.exports = passport => {
  /**
   * Authentication handler
   * @param {Object} express res object.
   * @param {Object} error   error object.
   * @param {Object} user    user object.
   * @return {Void}
   */
  const authHandler = (res, error, user) => {
    if (error) {
      res.json({error})
      return
    }
    if (user === false){
      res.json({error: {message: 'Invalid username or password', type: 'invalid'}})
      return
    }
    const {username, id} = user
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
  /**
   * Logout
   */
  auth.get('/logout', (req, res, next) => {
    req.logout()
    res.clearCookie('user')
    res.json({done: true})
  })
  /**
   * Me
   */
  auth.get('/me', (req, res, next) => {
    console.log(req.session)
    res.json(req.user || null)
  })
  /**
   * Return 
   */
  return auth
}