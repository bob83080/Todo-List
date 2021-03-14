const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const usePassport = require('./config/passport')
const { use } = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: "ThisIsMYSecret",
  resave: false,
  saveUninitialized: true
}))
app.use(bodyPraser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})