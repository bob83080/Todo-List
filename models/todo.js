const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)