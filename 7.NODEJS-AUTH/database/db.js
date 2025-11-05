//db.js
//path: database/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose. It exports a function that attempts to connect to the database using the URI stored in the environment variable MONGO_URI. If the connection is successful, it logs a success message; if it fails, it logs an error message and exits the process with a failure code.