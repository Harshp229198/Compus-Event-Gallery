//auth-routes.js
//path: routes/auth-routes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware"); // Import auth middleware

//all routes are related to auth

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
