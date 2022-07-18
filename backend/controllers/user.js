const router = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const sgMail = require("@sendgrid/mail");

// const bcrypt = require("bcrypt");
sgMail.setApiKey(config.SENDGRID_API_KEY);

router.post("/", async (request, response) => {
  const { email } = request.body;

  const userToGet = await User.findOne({ email });

  console.log(userToGet);
  if (!userToGet) {
    return response.status(404).json({
      error: "user email account not found",
    });
  }
  const token = userToGet.vToken;

  await sgMail.send({
    to: email,
    from: "noreply@todidit.com",
    subject: "Reset your toDidit password",
    html: `<h1>Forgot your password?</h1>
    <h2>Now worries!</h2>
    <p>Follow this link to reset your password for the account associated with ${email}</p>
        <button><a href=http://localhost:3000/reset-password/${token}>Reset your password</a></button>
        <p>If you did not ask to reset your password, you may ignore this email.</p>
        <p>Thanks,</p>
        <p>The toDidit team</p>`,
  });
  return response.json(userToGet);
});

router.get("/:id", async (request, response) => {
  const userToGet = await User.findById(request.params.id);
  return response.json(userToGet);
});

router.put("/:id", async (request, response) => {
  const update = request.body;
  console.log(request.body);
  const updatedUser = await User.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedUser);
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
