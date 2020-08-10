const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const app = express();
const mongoose = require('mongoose');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Databse connection error:'));
db.once('open', function() {
  console.log('Connected to database!');
});

// Routes
app.get('/', (req, res) => {
  return res.send('home route is working');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

// Server Start
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
