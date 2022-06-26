const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const taskRouter = require("./controllers/task");
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
// const testingRouter = require("./controllers/testing");
const { errorHandler, userExtractor } = require("./utils/middleware");
const logger = require("./utils/logger");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/task", userExtractor, taskRouter);

// if (process.env.NODE_ENV === "test") {
//   const testingRouter = require("./controllers/testing");
//   app.use("/api/testing", testingRouter);
// }

app.use(errorHandler);

module.exports = app;
