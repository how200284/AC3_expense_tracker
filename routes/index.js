// require Express and Express Router
const express = require('express')
const router = express.Router()

// require modules
const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middlewares/auth')

// set routes
router.use('/expense', authenticator, expense)
router.use('/users', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router