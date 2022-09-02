// require Express and Express Router
const express = require('express')
const router = express.Router()

// require dynamic data
const Category = require('../../models/category')
const Record = require('../../models/record')

// set routes
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Record.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router