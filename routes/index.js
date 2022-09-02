// require Express and Express Router
const express = require('express')
const router = express.Router()

// require modules
const home = require('./modules/home')
const expense = require('./modules/expense')

// set routes
router.use('/', home)
router.use('/expense', expense)


module.exports = router