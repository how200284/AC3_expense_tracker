// require external node_modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require internal modules
require('./config/mongoose')
const routes = require('./routes')

// excute
const app = express()
const PORT = process.env.PORT || 3000
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


app.listen(PORT, (req, res) => {
  console.log(`This app is working on http://localhost:${PORT}`)
})