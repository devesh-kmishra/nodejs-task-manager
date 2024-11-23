const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8080;
const URI = process.env.URI || 'mongodb://127.0.0.1/deveshtodo';

mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.on('open', () => console.log('Connected to MongoDB database'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRouter = require('./routes/action');

app.use('/', todoRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});