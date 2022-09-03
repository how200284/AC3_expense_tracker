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
  const errors = []
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'This email has been registered.' })
      return res.render('register', { name, email, password, confirmPassword })
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
    res.redirect('/users/login')
  })
})

module.exports = router