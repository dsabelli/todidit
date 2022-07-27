const bcrypt = require("bcrypt");
const validator = require("validator");
const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(config.SENDGRID_API_KEY);
const url = "http://localhost:3000/verify";

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
      error:
        "Password must include 8-16 characters with a mix of letters, numbers & symbols.",
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({
      error: "Passwords must match",
    });
  }

  const token = jwt.sign({ email: email }, config.EMAIL_SECRET);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    username,
    passwordHash,
    date,
    vToken: token,
    lastLogin: null,
  });

  const savedUser = await user.save();
  if (savedUser) {
    const msg = {
      to: email,
      from: "noreply@todidit.com",
      templateId: "d-9c5be37a921c4c1796c2bf099e7b5178",
      dynamic_template_data: {
        subject: "Please verify your account",
        username: username,
        url: url,
        token: token,
      },
    };

    await sgMail.send(msg);
    response.status(201).json(savedUser);
  } else
    response.status(500).json({
      error: "Unable to register account, please try again later",
    });
});

router.get("/verify/:token", async (request, response) => {
  const token = request.params.token;
  const verifiedUser = await User.findOne({ vToken: token });
  if (!verifiedUser) {
    return response.status(404).json({ error: "Account not found" });
  }

  verifiedUser.verified = true;
  const savedUser = await verifiedUser.save();

  response.status(200).json(savedUser);
});

// router.get("/", async (request, response) => {
//   const existingEmail = await User.findOne({ email: request.query.email });
//   if (existingEmail) {
//     return response.status(400).json({
//       error: "An account with this email address already exists, try another.",
//     });
//   }
// });

module.exports = router;
