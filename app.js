const express = require('express')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')
const bodyPraser = require('body-parser')
const Todo = require('./models/todo')

const app = express()

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

app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})



app.post('/todos', (req, res) => {
  const name = req.body.name

  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.error(error))

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))

})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === "on"
      // if (isDone === 'on'){
      //   todo.isDone = true 
      // } else {
      //   todo.isDone = false
      // }
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))

})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})