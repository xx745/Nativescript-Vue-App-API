
const MongoClient = require('mongodb').MongoClient;
const dbClient = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async function() {
  try {
    await dbClient.connect();
    console.log('Connected successfully to MongoDB!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  dbClient
};
