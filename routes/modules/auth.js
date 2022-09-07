// require Express and Express Router
const express = require('express')
const router = express.Router()

// require Passport.js
const passport = require('passport')

// set routes
  // send request to Facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

  // receive response from Facebook
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router