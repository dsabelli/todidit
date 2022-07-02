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
    return response.status(400).json({ error: "please enter a valid email" });
  }
  if (existingEmail) {
    return response.status(400).json({
      error: "an account with this email address already exists",
    });
  }

  // const existingUser = await User.findOne({ username });
  // if (existingUser) {
  //   return response.status(400).json({
  //     error: "Username is already taken, try another.",
  //   });
  // }
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
