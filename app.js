const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const morgan = require('morgan');
const connectDB = require('./db');
const app = express();
const session = require('express-session');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.get('/', (req, res) => {
  const session = req.session;
  session.testVariable = 'yolo';
  console.log(session);
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
