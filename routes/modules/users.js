// require Express and Express Router
const express = require('express')
const router = express.Router()

// require dynamic data
const User = require('../../models/user')

// set routes
  // login page
router.get('/login', (req, res) => {
  res.render('login')
})

  // register page
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router