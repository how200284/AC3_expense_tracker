// require Express and Express Router
const express = require('express')
const router = express.Router()
const dayjs= require('dayjs')

// require dynamic data
const Category = require('../../models/category')
const Record = require('../../models/record')

// set routes
  // new page
router.get('/new', (req, res) => {
  const today = dayjs().format('YYYY-MM-DD')
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories, today }))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Record.create({ name, date, categoryId: category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

  // edit page
router.get('/:recordId/edit', async (req, res) => {
  try {
    const _id = req.params.recordId
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id }).populate('categoryId').lean() // add populate() for eager loading
    record.date = dayjs(record.date).format('YYYY-MM-DD')
    res.render('edit', { record, categories })
  } catch(err) {
    console.error(err)
  }
})

router.put('/:recordId', async (req, res) => {
  try {
    const UserId = req.user._id
    const _id = req.params.recordId
    const { name, date, amount, category } = req.body
    await Record.findOneAndUpdate({ UserId, _id }, { name, date, amount, categoryId: category })
    res.redirect('/')
  } catch (err) {
    console.error(err)
  } 
})

  // delete button
router.delete('/:recordId', (req, res) => {
  const UserId = req.user._id
  const _id = req.params.recordId
  return Record.findOneAndDelete({ UserId, _id })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router