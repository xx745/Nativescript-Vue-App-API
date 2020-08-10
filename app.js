const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('home route is working');
});

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const userRouter = require('./routes/user');
app.use('/users', userRouter);

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
