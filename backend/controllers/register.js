const bcrypt = require("bcrypt");
const validator = require("validator");
const router = require("express").Router();
const User = require("../models/user");
const Project = require("../models/project");
const Task = require("../models/task");
const Didit = require("../models/didit");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const sgMail = require("@sendgrid/mail");
const subDays = require("date-fns/subDays");

sgMail.setApiKey(config.SENDGRID_API_KEY);
const url = "http://localhost:3000/verify";

router.post("/", async (request, response) => {
  const { email, username, password, confirmPassword, date } = request.body;

  const existingEmail = await User.findOne({ email });
  if (!validator.isEmail(email)) {
    return response.status(400).json({ error: "Please enter a valid email" });
  }
  if (existingEmail) {
    return response.status(400).json({
      error: "An account with this email address already exists",
    });
  }

  if (!password || !validator.isStrongPassword(password)) {
    return response.status(400).json({
      error:
        "Password must include 8-16 characters with a mix of letters, numbers & symbols.",
    });
  }
  if (password !== confirmPassword) {
    return response.status(400).json({
      error: "Passwords must match",
    });
  }

  const token = jwt.sign({ email: email }, config.EMAIL_SECRET);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    username,
    passwordHash,
    date,
    vToken: token,
    lastLogin: null,
    settings: {
      dateFormat: "MMM-dd-yyyy",
      theme: "light",
      sortBy: "dueDate",
      order: "ascending",
    },
  });

  const project = new Project({
    title: "My First Project",
    user: user.id,
  });

  const task1 = new Task({
    title: "Add your first task",
    dueDate: new Date(),
    isImportant: true,
    project: project.id,
    user: user.id,
  });
  const task2 = new Task({
    title: "Create a new project",
    dueDate: new Date(),
    project: project.id,
    user: user.id,
  });
  const task3 = new Task({
    title: "Try a new theme",
    description:
      "You can find themes in your account settings by clicking your avatar",
    dueDate: new Date(),
    project: project.id,
    user: user.id,
  });
  const task4 = new Task({
    title:
      "Complete a task, delete it, then use the Didit search to view it again",
    description:
      "You can use the Didit search in the navigation bar above to find tasks you've completed.",
    dueDate: new Date(),
    project: project.id,
    user: user.id,
  });
  const task5 = new Task({
    title: "Check out the Time Machine in the Menu bar",
    description:
      "You can use the Time Machine to go back in time and see the tasks you were working on, and the tasks you completed for a particular day.",
    dueDate: new Date(),
    project: project.id,
    user: user.id,
  });
  const task6 = new Task({
    title: "Completed Task",
    description: "Delete me!",
    dueDate: new Date(),
    isChecked: true,
    completedOn: new Date(),
    project: project.id,
    user: user.id,
  });
  const didit1 = new Didit({
    title: "Task from the Past",
    description: "Use the Time Machine!",
    createdOn: subDays(new Date(), 2),
    dueDate: subDays(new Date(), 1),
    isChecked: true,
    completedOn: subDays(new Date(), 1),
    project: project.id,
    user: user.id,
  });

  const savedProject = await project.save();
  const savedTask1 = await task1.save();
  const savedTask2 = await task2.save();
  const savedTask3 = await task3.save();
  const savedTask4 = await task4.save();
  const savedTask5 = await task5.save();
  const savedTask6 = await task6.save();
  const savedDidit1 = await didit1.save();

  user.projects = user.projects.concat(savedProject._id);
  user.tasks = user.tasks.concat([
    savedTask1._id,
    savedTask2._id,
    savedTask3._id,
    savedTask4._id,
    savedTask5._id,
    savedTask6._id,
  ]);
  user.didits = user.didits.concat(savedDidit1._id);

  const savedUser = await user.save();
  if (savedUser) {
    const msg = {
      to: email,
      from: "noreply@todidit.com",
      templateId: "d-9c5be37a921c4c1796c2bf099e7b5178",
      dynamic_template_data: {
        subject: "Please verify your account",
        username: username,
        url: url,
        token: token,
      },
    };

    await sgMail.send(msg);
    response.status(201).json(savedUser);
  } else
    response.status(500).json({
      error: "Unable to register account, please try again later",
    });
});

router.get("/verify/:token", async (request, response) => {
  const token = request.params.token;
  const verifiedUser = await User.findOne({ vToken: token });
  if (!verifiedUser) {
    return response.status(404).json({ error: "Account not found" });
  }

  verifiedUser.verified = true;
  const savedUser = await verifiedUser.save();

  response.status(200).json(savedUser);
});

// router.get("/", async (request, response) => {
//   const existingEmail = await User.findOne({ email: request.query.email });
//   if (existingEmail) {
//     return response.status(400).json({
//       error: "An account with this email address already exists, try another.",
//     });
//   }
// });

module.exports = router;
