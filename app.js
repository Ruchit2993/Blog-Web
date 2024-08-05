const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BI2');

// Set up EJS
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'server', 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import routes
const postRoutes = require('./server/routes/posts');
app.use('/posts', postRoutes);

// Home Route
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Port Configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
