const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
const methodOverride = require('method-override')
const Todo = require('./models/todo')

const app = express()

const routes = require('./routes')

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyPraser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)



app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})