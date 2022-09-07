// require Express and Express Router
const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

// require dynamic data
const User = require('../../models/user')

// set routes
  // login page
router.get('/login', (req, res) => {
  const errorMessage = req.flash('error')
  const errors = []
  if (errorMessage.length) {
    errors.push({ message: errorMessage })
  }

  res.render('login', { errors })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

  // register page
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.'})
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords and confirm Password do not match, please try again.'})
  }
  if (errors.length) {
    return res.render('register', { errors, name, email })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email has been registered.' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    return User.create({ 
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null) })
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
})

  // logout feature
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    req.flash('success_msg', 'You\'ve logged out successfully.')
    res.redirect('/users/login')
  })
})

module.exports = router