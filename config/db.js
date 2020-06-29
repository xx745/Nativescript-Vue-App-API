// const mongoose = require("mongoose");
// config module reads default config file
// const config = require("config");
// sets up 'db' variable with login data
// pulled from default.json file
// on Heroku, you can set up environmetal variables separately
// in order to protect sensitive data
// const db = config.get("mongoURI");

// const connectDB = async function() {
// 	try {
// 		await mongoose.connect(db, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true
// 		});
// 		console.log("MongoDB is Connected...");
// 	} catch (err) {
// 		console.error(err.message);
// 		// terminates the program on error
// 		process.exit(1);
// 	};
// };

// module.exports = connectDB;