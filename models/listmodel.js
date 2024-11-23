const mongoose = require('mongoose');
const collection = process.env.COLLECTION || 'todos';

const todoSchema = mongoose.Schema({
  category: { type: String },
  completed: { type: Boolean },
  title: {
    type: String,
    required: true
  },
  desc: { type: String },
  duedate: { type: String },
  cryptoid: { type: String }
});

module.exports = mongoose.model('Todo', todoSchema, collection);