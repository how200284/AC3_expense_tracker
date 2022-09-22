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
    let categories = await Category.find({}).lean()
    if (!categoryId) {
      let records = await Record.find({ userId }).lean()
      records.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
      })
      res.render('index', { records, categories })
    } else {
      let records = await Record.find({ userId, categoryId }).lean()
      records.forEach(record => {
        record.date = dayjs(record.date).format('YYYY-MM-DD')
      })
      res.render('index', { records, categories, totalAmount })
    }
  } catch(err){ 
    console.error(err)
  }
})

module.exports = router