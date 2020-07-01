const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/config/.env') });
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  return res.send('home route is working');
});

// app.get('/all-todos', async (req, res) => {
//   await connectDB();
//   const db = dbClient.db(dbName);
//   const col = db.collection(dbCollection)
//   const allTodos = await col.find({}).toArray();

//   res.json(allTodos);
// });

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
