// require Express and Express Router
const express = require('express')
const router = express.Router()

// require modules
const home = require('./modules/home')

// set routes
router.use('/', home)


module.exports = router