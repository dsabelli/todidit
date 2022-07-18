const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  console.log(user);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "Invalid email or password",
    });
  }

  if (!user.verified) {
    return response.status(401).json({
      error: "Please verify your email before logging in.",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username: user.username, id: user._id });
});

module.exports = router;
