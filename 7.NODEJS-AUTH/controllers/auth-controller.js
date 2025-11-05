//auth-controller.js
//path: controllers/auth-controller.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller
const registerUser = async (req, res) => {
  try {
    //extracting data from request body
    const { username, email, password, role } = req.body;
    //checking if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login instead",
      });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    if (user) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register the user, please try again.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user, please try again later",
    });
  }
};

//login controller

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found, please register first",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, please try again",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error logging in user, please try again later",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.id;

    //extracting old and new password from request body
    const { oldPassword, newPassword } = req.body;
    //finding user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //checking if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }
    //hashing new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    //updating password in database
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error changing password, please try again later",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
