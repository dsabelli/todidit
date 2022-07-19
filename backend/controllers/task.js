const router = require("express").Router();
const Task = require("../models/task");

router.get("/", async (request, response) => {
  const tasks = await Task.find({ user: request.query.id });
  response.json(tasks);
});

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (!request.body.project) {
    return response.status(400).json({ error: "select a project" });
  }

  const user = request.user;
  const projects = request.projects;

  const task = new Task({
    ...request.body,
    user: user.id,
  });

  const project = projects.find(
    (project) => project.id === request.body.project
  );

  const savedTask = await task.save();

  user.tasks = user.tasks.concat(savedTask._id);
  project.tasks = project.tasks.concat(savedTask._id);
  await user.save();
  await project.save();

  response.status(201).json(savedTask);
});

router.delete("/", async (request, response) => {
  const updatedTasks = await Task.deleteMany({});
  response.status(204).json(updatedTasks);
});

router.get("/:id", async (request, response) => {
  const taskToGet = await Task.findById(request.params.id);
  if (!taskToGet) {
    return response.status(404, { error: "task not found" }).end();
  }
  return response.json(taskToGet);
});

router.delete("/:id", async (request, response) => {
  const taskToDelete = await Task.findById(request.params.id);
  if (!taskToDelete) {
    return response.status(204).end();
  }
  if (taskToDelete.user && taskToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete a task",
    });
  }

  await Task.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const task = request.body;

  const updatedTask = await Task.findByIdAndUpdate(request.params.id, task, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(updatedTask);
});

module.exports = router;
