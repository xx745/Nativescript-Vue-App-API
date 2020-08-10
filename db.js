const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async() => {
  mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Databse connection error:'));
  db.once('open', function() {
    console.log('Connected to database!');
  });
};

module.exports = connectDB;
