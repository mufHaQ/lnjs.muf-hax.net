const express = require('express')
const app = express()
const helmet = require('helmet')
require('ejs')
require('dotenv').config()

// Middleware
let printDate = (req, res, next) => {
  req.dateTime = new Date()
  next()
}
app.use(printDate)

// Parsing
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: false
})) // for parsing application/x-www-form-urlencoded

// ejs
app.set('views', 'src/views/pages')
app.set('view engine', 'ejs')

// Helmet
app.use(helmet())
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());

// Port
let port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server is Okay!')
})

// Static
app.use(express.static('src/'))

// Routing
const route = require('./src/router/routing')
app.use(route.app)
app.use(route.router)