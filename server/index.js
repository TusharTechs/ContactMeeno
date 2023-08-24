const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 5000;
const connectDB = require("./db/dbConnect");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());

// Body parsing middleware
app.use(express.json());

// Define routes
app.use("/api/contacts", require("./routes/Contacts"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
