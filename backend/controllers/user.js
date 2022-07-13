const router = require("express").Router();
const User = require("../models/user");

router.delete("/:id", async (request, response) => {
  const userToDelete = await User.findById(request.params.id);
  if (!userToDelete) {
    return response.status(204).end();
  }
  console.log(userToDelete.id);
  console.log(request.user.id);
  if (userToDelete.id && userToDelete.id.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete their account",
    });
  }

  await User.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = router;
