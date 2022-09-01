// require external node_modules
const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// excute
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('It works')
})

app.listen(PORT, (req, res) => {
  console.log(`This app is working on http://localhost:${PORT}`)
})