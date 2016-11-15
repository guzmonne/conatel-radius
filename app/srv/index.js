'use strict'
// Needed modules
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const sessionstore = require('sessionstore')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const app = express();
// Routers
const api = require('./api.js')
const auth = require('./auth.js')(passport)
// Constants
const PORT = process.env.PORT || 5000
/**
 * Configuration
 */
// Passport
require('./passport.js')(passport)
// Express
app.use(express.static('build'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('C0n4t3lC0n4t3l'))
app.use(session({
  secret: 'C0n4t3lC0n4t3l',
  resave: false,
  store: sessionstore.createSessionStore(),
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}))
app.use(cors())
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())
/**
 * Routes definitions.
 */
app.use('/auth', auth)
app.use('/api', api)
// Return index.html as default.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirnam, '..', 'public', 'index.html'))
});
/**
 * Start server
 */
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});