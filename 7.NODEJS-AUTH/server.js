//server.js
//path: server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db.js");
const authRoutes = require("./routes/auth-routes.js");
const homeRoutes = require("./routes/home-routes.js");
const adminRoutes = require("./routes/admin-routes.js");
const imageRoutes = require("./routes/image-routes.js");

connectDB(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

//middleware
app.use(express.json()); // Parse JSON request bodies

app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/home", homeRoutes); // Use home routes
app.use("/api/admin", adminRoutes); // Use home routes
app.use("/api/image", imageRoutes); // Use image routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
