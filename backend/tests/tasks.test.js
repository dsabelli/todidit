const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Task = require("../models/task");
const Project = require("../models/project");

describe("When a user attempts to create a task", () => {
  let token;
  let projectId;
  beforeAll(async () => {
    await Task.deleteMany({});
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

    const project = {
      title: "Test Project",
    };
    const res = await api
      .post("/api/projects")
      .send(project)
      .set("Authorization", `bearer ${token}`);

    projectId = res.body.id;
  });

  it("succeeds if content is valid", async () => {
    const newTask = {
      title: "Test Task",
      project: projectId,
    };

    await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if title is missing", async () => {
    const newTask = {
      title: "",
      project: projectId,
    };

    await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if project is missing", async () => {
    const newTask = {
      title: "Test Task",
      project: "",
    };

    await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("When a user attemps to get a task", () => {
  let token;
  let projectId;
  let taskId;
  let userId;
  beforeAll(async () => {
    await Task.deleteMany({});
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
    userId = response.body.id;

    const project = {
      title: "Test Project",
    };
    const res = await api
      .post("/api/projects")
      .send(project)
      .set("Authorization", `bearer ${token}`);

    projectId = res.body.id;

    const newTask = {
      title: "test",
      description: "test",
      project: projectId,
    };
    const r = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);
    console.log(r.body);

    taskId = r.body.id;
  });

  it("succeeds if user query found", async () => {
    const query = {
      params: { id: userId },
    };
    await api
      .get(`/api/tasks/`)
      .send(query)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("succeeds if task id found", async () => {
    const newTask = {
      title: "Test Task",
      project: projectId,
    };
    const response = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);

    taskId = response.body.id;

    await api
      .get(`/api/tasks/${taskId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if task id not found", async () => {
    let notReal = "92d6d4d5ce37e7f3c87558f1";
    await api
      .get(`/api/tasks/${notReal}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);
  });
});

describe("When a user attemps to modify a task", () => {
  let token;
  let projectId;
  let taskId;
  beforeAll(async () => {
    await Task.deleteMany({});
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

    const project = {
      title: "Test Project",
    };
    const res = await api
      .post("/api/projects")
      .send(project)
      .set("Authorization", `bearer ${token}`);

    projectId = res.body.id;

    const newTask = {
      title: "test",
      description: "test",
      project: projectId,
    };
    const r = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);
    console.log(r.body);

    taskId = r.body.id;
  });

  it("succeeds if found", async () => {
    const foundTask = await Task.findById(taskId);

    const changedTask = {
      title: "changed",
    };
    await api
      .put(`/api/tasks/${foundTask._id}`)
      .send(changedTask)
      .set("Authorization", `bearer ${token}`)
      .expect(200);
  });
});

describe("When a user attemps to delete a task", () => {
  let token;
  let taskId;
  let projectId;
  beforeAll(async () => {
    await Task.deleteMany({});
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

    const project = {
      title: "Test Project",
    };
    const res = await api
      .post("/api/projects")
      .send(project)
      .set("Authorization", `bearer ${token}`);

    projectId = res.body.id;

    const newTask = {
      title: "test",
      description: "test",
      project: projectId,
    };
    const r = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);
    console.log(r.body);

    taskId = r.body.id;
  });

  it("succeeds if found", async () => {
    const foundTask = await Task.findById(taskId);

    await api
      .delete(`/api/tasks/${foundTask._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
