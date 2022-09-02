// Add the thread below since we will execute recordSeeder.js directly. Environment variable of MongoDB should be loaded while processing this file, so we put the conditional exp here to make sure server get the variable in dotenv.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')
const recordJSON = require('../JSONs/record.json').results
const userJSON = require('../JSONs/user.json').results


db.once('open', async () => {
  try {
    // get categories
    const categories = await Category.find().lean()     // transform from Prototype.object into JS original Object
    // create users
    await Promise.all(userJSON.map(async user => {
      const { name, email, password } = user
      const userData = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
      })     // API from bcrypt.js
      console.log('user created.')
      // create single user's records
      await Promise.all(recordJSON.map(async record => {
        const { name, date, amount, category } = record
        let categoryData = categories.find(categoryData => categoryData.name === category)
        await Record.create({
          name,
          date,
          amount,
          userId: userData._id,
          categoryId: categoryData._id
        })
      }))
      console.log('records created.')
    }))
  } catch (err) {
    console.error(err)
  } finally {
    db.close()
  }
})


/*
///// Try to re-write with Promise

db.once('open', async () => {
  // get category data from MongoDB & build promise instance
  const categories = await Category.find().lean()    // Async/Await is required since we need this data captured before running the threads below.
  
  // create users
  Promise.all(userJSON.map(singleUser => {
    const { name, email, password } = singleUser
    const userData = User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    })
    console.log(userData)
  }))
  // create records
  .then(userData => { 
    console.log('user created')
    Promise.all(recordJSON.map(singleRecord => {
      const { name, date, amount, category } = singleRecord
      categoryData = categories.find(categoryData => categoryData.name === category) 
      console.log(userData)
      Record.create({
        name,
        date,
        amount,
        categoryId: categoryData._id,
        userId: userData._id     // The issue happens here. UserData would be undefined. No matter I've tried console.log(userData) before entering this .then()
      })
      console.log('record created')
    }))
    })
  .catch(err => console.error(err))
  .finally(db.close())
})
*/

/* 心得
Asnyc/Await語法糖比 Promise語法直觀太多了...
由上而下的閱讀方式、明確地流程控管（遇到 await就會等這部分完成，才繼續剩餘 async的code）、而且可以直接定義一個非同步函式，不必先建立 Instance再使用，真的太好用了...
*/