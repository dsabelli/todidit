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
  const projects = request.projects;
  console.log(request.projects);
  const didit = new Didit({
    ...request.body,
    user: user.id,
  });

  const project = projects.filter(
    (project) => project.id === request.body.project
  );
  console.log(project);
  const savedDidit = await didit.save();

  user.didits = user.didits.concat(savedDidit._id);
  project[0].didits = project[0].didits.concat(savedDidit._id);
  await user.save();
  await project[0].save();

  response.status(201).json(savedDidit);
});

router.delete("/", async (request, response) => {
  const updatedTasks = await Didit.deleteMany({});
  response.status(204).json(updatedTasks);
});

router.get("/:id", async (request, response) => {
  const taskToGet = await Didit.findById(request.params.id);
  if (!taskToGet) {
    return response.status(404, { error: "task not found" }).end();
  }
  return response.json(taskToGet);
});

module.exports = router;
