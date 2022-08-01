const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid email or password",
    });
  }

  if (!user.verified && user.lastLogin === null) {
    user.lastLogin = Date.now();
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    await user.save();
    const token = jwt.sign(userForToken, config.SECRET);

    return response
      .status(200)
      .send({ token, username: user.username, id: user._id });
  } else if (!user.verified) {
    return response.status(401).json({
      error: "Please verify your email before logging in.",
    });
  }

  user.lastLogin = Date.now();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  await user.save();
  const token = jwt.sign(userForToken, config.SECRET);

  response.status(200).send({ token, username: user.username, id: user._id });
});

module.exports = router;
