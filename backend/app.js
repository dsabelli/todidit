const { MONGODB_URI } = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const taskRouter = require("./controllers/task");
const diditRouter = require("./controllers/didit");
const notesRouter = require("./controllers/notes");
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
const projectRouter = require("./controllers/project");
const userRouter = require("./controllers/user");
const { errorHandler, userExtractor } = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info("connecting to", MONGODB_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // family: 4,
    });
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connection to MongoDB:", error.message);
  }
};
connectDB();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/tasks", userExtractor, taskRouter);
app.use("/api/didits", userExtractor, diditRouter);
app.use("/api/notes", userExtractor, notesRouter);
app.use("/api/projects", userExtractor, projectRouter);
app.use("/api/users", userExtractor, userRouter);

app.use(errorHandler);

module.exports = app;
