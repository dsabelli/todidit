const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Project = require("../models/project");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  next(error);
};

//if a user is logged in this function grabs the bearer token and if its able to decode it,
//it finds the user associated with the login as well as their projects/didits and sends into the request object
const userExtractor = async (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      process.env.SECRET
    );
    if (decodedToken) {
      request.user = await User.findById(decodedToken.id);
      request.projects = await Project.find({ user: decodedToken.id });
    }
  }

  next();
};

module.exports = {
  errorHandler,
  userExtractor,
};
