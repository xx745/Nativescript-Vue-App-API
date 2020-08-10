const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const morgan = require('morgan');
const connectDB = require('./db');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  return res.send('home route is working');
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

// Server Start
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

// Database connection start
connectDB();
