import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '/config/.env') });
import { MongoClient } from 'mongodb';
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority&tls=true`;
const dbClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async function() {
  try {
    await dbClient.connect();
    console.log("Connected successfully to the database!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  dbClient,
}
