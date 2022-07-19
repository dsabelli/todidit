const router = require("express").Router();
const Project = require("../models/project");

router.get("/", async (request, response) => {
  const projects = await Project.find({ user: request.query.id });
  response.json(projects);
});

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const project = new Project({
    ...request.body,
    user: user.id,
  });

  const savedProject = await project.save();

  user.projects = user.projects.concat(savedProject._id);
  await user.save();

  response.status(201).json(savedProject);
});

router.get("/:id", async (request, response) => {
  const projectToGet = await Project.findById(request.params.id);
  if (!projectToGet) {
    return response.status(404, { error: "task not found" }).end();
  }
  return response.json(projectToGet);
});

router.put("/:id", async (request, response) => {
  const project = request.body;

  const updatedProject = await Project.findByIdAndUpdate(
    request.params.id,
    project,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  response.json(updatedProject);
});

// router.delete("/:id", async (request, response) => {
//   const projectToDelete = await Project.findById(request.params.id);
//   if (!projectToDelete) {
//     return response.status(204).end();
//   }

//   if (
//     projectToDelete.user &&
//     projectToDelete.user.toString() !== request.user.id
//   ) {
//     return response.status(401).json({
//       error: "only the creator can delete a task",
//     });
//   }

//   await Project.findByIdAndRemove(request.params.id);

//   response.status(204).end();
// });

module.exports = router;
