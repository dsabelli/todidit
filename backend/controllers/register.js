const bcrypt = require("bcrypt");
const validator = require("validator");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { username, email, password, confirmPassword, date } = request.body;

  if (!password || !validator.isStrongPassword(password)) {
    return response.status(400).json({
      error: "invalid password",
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({
      error: "passwords must match",
    });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  const existingEmail = await User.findOne({ email });
  if (!validator.isEmail(email)) {
    return response.status(400).json({ error: "please enter a valid email" });
  }
  if (existingEmail) {
    return response.status(400).json({
      error: "an account with this email address already exists",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
    date,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = router;
