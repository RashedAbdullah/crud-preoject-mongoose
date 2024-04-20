const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/user-schema");

const UserModel = new mongoose.model("User", userSchema);

// Signup:
router.post("/signup", async (req, res) => {
  try {
    const hashedPassowrd = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      username: req.body.username,
      name: req.body.name,
      password: hashedPassowrd,
    });
    await newUser.save();
    res.status(200).json({
      message: "Successfully Signed up",
    });
  } catch (err) {
    res.status(500).json({
      error: "Signup failed",
    });
  }
});

// Signin:
router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassowrd = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassowrd) {
        // Token generating:
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JST_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          accessToken: token,
          message: "Signin successfull",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Authentication failed",
    });
  }
});

module.exports = router;
