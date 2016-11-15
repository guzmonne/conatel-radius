'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('./knex.js')
const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirnam, '..', 'public', 'index.html'))
});

app.get('/radcheck', (req, res) => {
  knex.select().from('radcheck')
  .then(result => res.json(result))
  .catch(error => res.json(error))
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});