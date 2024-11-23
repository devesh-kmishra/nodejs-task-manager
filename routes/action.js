const express = require('express');
const app = express();
const router = express.Router();
const Todo = require('../models/listmodel');

const categ = ['upcoming', 'important', 'urgent'];
let array = [];

// HOME PAGE
router.get('/', async (req, res) => {
  res.render('index', { array: array, categ: categ });
});

// INVALID URL
router.get('/*', (req, res) => {
  res.render('error');
});

// DISPLAY TASKS by selected category
router.post('/display', getTasks, async (req, res) => {
  array = res.tasks;

  try {
    res.status(200).render('index', { array: array, categ: categ });
  } catch (err) {
    res.status(500).render('index', { error: err.message });
  }
});

// UPDATE TASK
router.post('/update/:cryptoid/:id', getTask, getTasks, async (req, res) => {
  array = res.tasks;

  let newCategory, newCompleted, newTitle, newDesc, newDuedate;
  for (let [key, value] of Object.entries(req.body)) {
    if (key == `liinputcategory${req.params.id}`) {
      newCategory = value;
    } else if (key == `licompleted${req.params.id}`) {
      newCompleted = value;
    } else if (key == `lititle${req.params.id}`) {
      newTitle = value;
    } else if (key == `lidesc${req.params.id}`) {
      newDesc = value;
    } else if (key == `liduedate${req.params.id}`) {
      newDuedate = value;
    }
  }

  res.task.category = newCategory;
  res.task.completed = newCompleted;
  res.task.title = newTitle;
  res.task.desc = newDesc;
  res.task.duedate = newDuedate;

  try {
    await res.task.save();
    res.status(200).render('index', { array: array, categ: categ });
  } catch (err) {
    res.status(400).render('index', { array: array, categ: categ, error: err.message });
  }
});

// DELETE TASK
router.post('/delete/:cryptoid', getTasks, async (req, res) => {
  array = res.tasks;

  try {
    const task = await Todo.findOneAndDelete({ cryptoid: req.params.cryptoid });
    if (task) {
      console.log('Deleted User :)');
      res.status(200).render('index', { array: array, categ: categ });
    } else {
      console.log('Error Occured');
    }
  } catch (err) {
    res.status(500).render('index', { array: array, categ: categ, error: err.message });
  }
});

// CREATE TASK
router.post('/', getTasks, async (req, res) => {
  const task = new Todo({
    category: req.body.inputcategory,
    completed: req.body.completed,
    title: req.body.title,
    desc: req.body.desc,
    duedate: req.body.duedate,
    cryptoid: crypto.randomUUID()
  });
  try {
    await task.save();
    res.status(201).render('index', { array: array, categ: categ });
  } catch (err) {
    res.status(400).render('index', { array: array, categ: categ, error: err.message });
  }
});

// FETCH SAME TASK FOR UPDATING OR DELETING - MIDDLEWARE
async function getTask(req, res, next) {
  let task;
  try {
    task = await Todo.findOne({ cryptoid: req.params.cryptoid });
  } catch (err) {
    return res.status(404).render('index', { error: err.message });
  }

  res.task = task;
  next();
}

// FETCH SAME TASKS BY CATEGORY TO DISPLAY
async function getTasks(req, res, next) {
  let tasks;
  try {
    if (req.body.listcategory == 'all') {
      tasks = await Todo.find({});
    } else {
      tasks = await Todo.find({ category: req.body.listcategory });
    }
  } catch (err) {
    return res.status(500).render('index', { error: err.message });
  }

  res.tasks = tasks;
  next();
}

module.exports = router;

// remember to router.route.get.post...
// remember to handle errors
// remove all error: err.message