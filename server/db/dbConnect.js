const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
function connectDB() {
  // Get the MongoDB URI from the environment variables
  const DB_URL = process.env.MONGO_URI;

  // Connect to the database with provided options
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the database connection instance
  const db = mongoose.connection;

  // Handle database connection errors
  db.on("error", console.error.bind(console, "Connection error: "));

  // Once the connection is open, log a success message
  db.once("open", function () {
    console.log("DB connected...");
  });
}

// Export the connectDB function
module.exports = connectDB;
