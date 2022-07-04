const router = require("express").Router();
const Didit = require("../models/didit");

router.get("/", async (request, response) => {
  const tasks = await Didit.find({ user: request.query.id });
  response.json(tasks);
});

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const task = new Didit({
    ...request.body,
    user: user.id,
  });

  const savedTask = await task.save();

  user.tasks = user.tasks.concat(savedTask._id);
  await user.save();

  response.status(201).json(savedTask);
});

router.get("/:date", async (request, response) => {
  const taskToGet = await Didit.findById(request.params.id);
  if (!taskToGet) {
    return response.status(404, { error: "task not found" }).end();
  }
  return response.json(taskToGet);
});

module.exports = router;
