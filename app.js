// require external node_modules
const express = require('express')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require internal modules
require('./config/mongoose')

// excute
const app = express()
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, (req, res) => {
  console.log(`This app is working on http://localhost:${PORT}`)
})