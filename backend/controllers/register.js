const bcrypt = require("bcrypt");
const validator = require("validator");
const router = require("express").Router();
const User = require("../models/user");

// router.get("/", async (request, response) => {
//   const users = await User.find({}).populate("blogs", {
//     author: 1,
//     title: 1,
//     url: 1,
//     likes: 1,
//   });

//   response.json(users);
// });

router.post("/", async (request, response) => {
  const { username, email, password, date } = request.body;

  if (!password || !validator.isStrongPassword(password)) {
    return response.status(400).json({
      error: "invalid password",
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
