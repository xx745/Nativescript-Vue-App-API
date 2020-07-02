const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/config/.env') });
const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('./mongoUri');
const dbClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async function() {
  try {
    await dbClient.connect();
    console.log("Connected successfully to MongoDB!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  dbClient
}
