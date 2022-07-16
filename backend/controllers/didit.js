const router = require("express").Router();
const Didit = require("../models/didit");

router.get("/", async (request, response) => {
  if (request.query.project) {
    const didits = await Didit.find({
      project: request.query.project,
    });
    response.json(didits);
  } else if (request.query) {
    console.log(request.query);
    const didits = await Didit.find({
      $and: [
        { title: { $regex: request.query.title, $options: "i" || "" } },
        {
          createdOn: {
            $gte: request.query.dateA || new Date(1970),
            $lt: request.query.dateB || new Date(),
          },
        },
      ],
    });
    response.json(didits);
  }
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
  console.log(didit);
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

// router.delete("/", async (request, response) => {
//   const updatedTasks = await Didit.deleteMany({});
//   response.status(204).json(updatedTasks);
// });

router.get("/:id", async (request, response) => {
  const taskToGet = await Didit.findById(request.params.id);
  if (!taskToGet) {
    return response.status(404, { error: "task not found" }).end();
  }
  return response.json(taskToGet);
});

module.exports = router;
