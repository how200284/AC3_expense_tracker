// Add the thread below since we will execute categorySeeder.js directly. Environment variable of MongoDB should be loaded while processing this file, so we put the conditional exp here to make sure server get the variable in dotenv.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')
const categoryJSON = require('../JSONs/category.json').results

db.once('open', async() => {
  try {
    await Category.create(categoryJSON)
    console.log('Category Seeders Done.')
  } catch {
    (err => console.error(err))
  } finally {
    db.close()
  }
})