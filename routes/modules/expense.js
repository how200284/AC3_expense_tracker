// require Express and Express Router
const express = require('express')
const router = express.Router()

// require dynamic data
const Category = require('../../models/category')
const Record = require('../../models/record')

// set routes
  // new page
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

  // edit page
router.get('/:recordId/edit', (req, res) => {
  const recordId = req.params.recordId
  return Record.findOne({ recordId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => console.error(err))
})

router.put('/:recordId', (req, res) => {
  const UserId = req.user._id
  const editedInput = req.body
  const recordId = req.params.recordId
  return Record.findOneAndUpdate({ UserId }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router