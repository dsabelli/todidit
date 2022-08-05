const router = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const sgMail = require("@sendgrid/mail");
const validator = require("validator");
const bcrypt = require("bcrypt");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const url = "http://localhost:3000/reset-password";

router.post("/", async (request, response) => {
  const { email } = request.body;

  const userToGet = await User.findOne({ email });

  if (!userToGet) {
    return response.status(404).json({
      error: "user email account not found",
    });
  }
  const token = userToGet.vToken;

  const msg = {
    to: email,
    from: "noreply@todidit.com",
    templateId: "d-05a4a4ce8c8247878948346857ceefcd",
    dynamic_template_data: {
      subject: "Reset Your toDidit Password",
      email: email,
      url: url,
      token: token,
    },
  };

  await sgMail.send(msg);
  return response.json(userToGet);
});

router.get("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const userToGet = await User.findById(request.params.id);
  return response.json(userToGet);
});

router.put("/:id", async (request, response) => {
  const update = request.body;
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const updatedUser = await User.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedUser);
});

router.put("/confirm-reset/:token", async (request, response) => {
  const { password, confirmPassword } = request.body;
  const token = request.params.token;
  const updatedUser = await User.findOne({ vToken: token });

  if (!updatedUser) {
    return response.status(403).json({ error: "Your reset code has expired." });
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

  const saltRounds = 10;
  const updatedHash = await bcrypt.hash(password, saltRounds);

  updatedUser.passwordHash = updatedHash;

  const savedUser = await updatedUser.save();

  response.json(savedUser);
});

router.delete("/:id", async (request, response) => {
  const userToDelete = await User.findById(request.params.id);
  if (!userToDelete) {
    return response.status(204).end();
  }

  if (userToDelete.id && userToDelete.id.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete their account",
    });
  }

  await User.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = router;
