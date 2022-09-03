// require Express and Express Router
const express = require('express')
const router = express.Router()

const passport = require('passport')

// require dynamic data
const User = require('../../models/user')

// set routes
  // login page
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

  // register page
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('This email has been registered.')
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.error(err))
})

module.exports = router