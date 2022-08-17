const router = require("express").Router();
const Note = require("../models/note");
const parseJSON = require("date-fns/parseJSON");
const startOfDay = require("date-fns/startOfDay");
const endOfDay = require("date-fns/endOfDay");

router.get("/", async (request, response) => {
  const notes = await Note.find({ user: request.query.id });
  response.json(notes);
});

router.get("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (request.query.dateC) {
    const notes = await Note.find({
      $and: [
        { user: request.user.id },
        { createdOn: { $lte: endOfDay(parseJSON(request.query.dateC)) } },
        { completedOn: { $gte: startOfDay(parseJSON(request.query.dateC)) } },
      ],
    });
    response.json(notes);
  } else if (request.user) {
    const notes = await Note.find({ user: request.query.id });
    response.json(notes);
  }
});

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;

  const note = new Note({
    ...request.body,
    user: user.id,
    completedOn: endOfDay(new Date()),
  });

  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);

  await user.save();

  response.status(201).json(savedNote);
});

router.put("/:id", async (request, response) => {
  const note = request.body;

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(updatedNote);
});

module.exports = router;
