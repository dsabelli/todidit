const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Project = require("../models/project");

describe("When a user attempts to create a project", () => {
  let token;
  beforeAll(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      email: "dsabelli@gmail.com",
      username: "dsabelli",
      passwordHash,
      verified: true,
      vToken: "abc123",
    });

    await user.save();
    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;
  });

  it("succeeds if content is valid", async () => {
    const newProject = {
      title: "Test Project",
    };
    await api
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if title is not provided", async () => {
    const newProject = {
      title: "",
    };
    await api
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("When a user attempts to update a project", () => {
  let token;
  let projectId;
  beforeAll(async () => {
    await Project.deleteMany({});

    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;
  });

  it("succeeds if content is valid", async () => {
    const newProject = {
      title: "Test Project",
    };
    const response = await api
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `bearer ${token}`);

    projectId = response.body.id;

    const updatedProject = {
      title: "updated",
    };
    await api
      .put(`/api/projects/${projectId}`)
      .send(updatedProject)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if title is missing", async () => {
    const newProject = {
      title: "Test Project",
    };
    const response = await api
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `bearer ${token}`);

    projectId = response.body.id;

    const updatedProject = {
      title: "",
    };
    await api
      .put(`/api/projects/${projectId}`)
      .send(updatedProject)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("When a user attempts to get projects", () => {
  let token;
  let projectId;
  let userId;
  beforeAll(async () => {
    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;
    userId = response.body.id;
  });

  it("succeeds if user query found", async () => {
    await api
      .get(`/api/projects/?user=${userId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("succeeds if project id found", async () => {
    const newProject = {
      title: "Test Project",
    };
    const response = await api
      .post("/api/projects")
      .send(newProject)
      .set("Authorization", `bearer ${token}`);

    projectId = response.body.id;

    await api
      .get(`/api/projects/${projectId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if project id not found", async () => {
    let notReal = "92d6d4d5ce37e7f3c87558f1";
    await api
      .get(`/api/projects/${notReal}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
