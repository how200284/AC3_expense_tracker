// require Express and Express Router
const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()

// require dynamic data
const Record = require('../../models/record')
const Category = require('../../models/category')

// set routes
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryId = req.query.categoryId
    let totalAmount = 0
    let categories = await Category.find({}).lean()
    if (!categoryId) {
      let records = await Record.find({ userId }).lean().populate('categoryId') // add populate() for eager loading
      records.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
      res.render('index', { records, categories, totalAmount, categoryId })
    } else {
      let records = await Record.find({ userId, categoryId }).lean().populate('categoryId') // add populate() for eager loading
      records.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
        totalAmount += record.amount
      })
      res.render('index', { records, categories, totalAmount, categoryId })
    }
  } catch(err){ 
    console.error(err)
  }
})

module.exports = router