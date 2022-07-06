const bcrypt = require("bcrypt");
const validator = require("validator");
const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (request, response) => {
  console.log(request.query);
  const existingEmail = await User.findOne({ email: request.query.email });
  if (existingEmail) {
    return response.status(400).json({
      error: "An account with this email address already exists, try another.",
    });
  }
});

router.post("/", async (request, response) => {
  const { email, username, password, confirmPassword, date } = request.body;

  const existingEmail = await User.findOne({ email });
  if (!validator.isEmail(email)) {
    return response.status(400).json({ error: "Please enter a valid email" });
  }
  if (existingEmail) {
    return response.status(400).json({
      error: "An account with this email address already exists",
    });
  }

  if (!password || !validator.isStrongPassword(password)) {
    return response.status(400).json({
      error: "Invalid password",
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({
      error: "Passwords must match",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    username,
    passwordHash,
    date,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = router;
