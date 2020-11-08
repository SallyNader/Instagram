const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(442).json({ error: "Please add all fields!" });
  }

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res
      .status(442)
      .json({ error: "User already exists with this email!" });
  }

  const hashed = await bcrypt.hash(password, 12);

  const newUser = await new User({
    name,
    email,
    password: hashed,
  });
  newUser.save();
  return res.json({ message: "User saved successfully." });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add email or password." });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).json({ error: "Invalid email or password." });
  }

  const doMatch = await bcrypt.compare(password, user.password);
  if (doMatch) {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    const {_id, name, email } = user;
    return res.json({ token, user: {_id, name,email} });
  } else {
    return res.status(422).json({ error: "Invalid email or password" });
  }
});

module.exports = router;
