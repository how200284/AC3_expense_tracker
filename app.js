// require external node_modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require internal modules
require('./config/mongoose')
const routes = require('./routes')
const usePassport = require('./config/passport')

// excution area
const app = express()
const PORT = process.env.PORT || 3000
  // view engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
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

app.use(routes)


app.listen(PORT, (req, res) => {
  console.log(`This app is working on http://localhost:${PORT}`)
})