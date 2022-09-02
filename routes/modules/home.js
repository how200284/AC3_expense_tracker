// require Express and Express Router
const express = require('express')
const router = express.Router()

// require dynamic data
const Record = require('../../models/record')

// set routes
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

module.exports = router