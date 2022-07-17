const router = require("express").Router();
const User = require("../models/user");

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
