// require external node_modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require internal modules
require('./config/mongoose')
const routes = require('./routes')
const usePassport = require('./config/passport')
const handlebarsHelper = require('./helper/handlebars-helper')

// excution area
const app = express()
const PORT = process.env.PORT || 3000
  // view engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelper }))
app.set('view engine', 'hbs')
  // bodyParser & methodOverride
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
  // express-session, Passport.js
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)


app.listen(PORT, (req, res) => {
  console.log(`This app is working on http://localhost:${PORT}`)
})