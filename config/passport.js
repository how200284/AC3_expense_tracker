const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  // Initailize Passport modules
  app.use(passport.initialize())
  app.use(passport.session())

  // Set LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'This email has not registered yet.' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Invalid password.'})
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  // Set Serialize and Deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}