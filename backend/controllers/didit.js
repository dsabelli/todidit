const router = require("express").Router();
const Didit = require("../models/didit");

router.get("/", async (request, response) => {
  if (Object.keys(request.query).length === 0) {
    return response.status(404, { error: "didit not found" }).end();
  } else if (request.query.project) {
    const didits = await Didit.find({
      project: request.query.project,
    });
    response.json(didits);
  } else if (request.query) {
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

  const didit = new Didit({
    ...request.body,
    user: user.id,
  });

  const project = projects.find(
    (project) => project.id === request.body.project
  );

  const savedDidit = await didit.save();

  user.didits = user.didits.concat(savedDidit._id);
  project.didits = project.didits.concat(savedDidit._id);
  await user.save();
  await project.save();

  response.status(201).json(savedDidit);
});

router.get("/:id", async (request, response) => {
  const taskToGet = await Didit.findById(request.params.id);
  if (!taskToGet) {
    return response.status(404, { error: "didit not found" }).end();
  }
  return response.json(taskToGet);
});

module.exports = router;
