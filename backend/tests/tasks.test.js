const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Task = require("../models/task");

describe("When a user attempts to create a task", () => {
  let token;
  beforeAll(async () => {
    await Task.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      username: "dsabelli",
      email: "dsabelli@gmail.com",
      passwordHash,
    });
    user.save();
    const response = await api
      .post("/api/login")
      .send({ username: "dsabelli", password: "ArnoandLily1!" });

    token = response.body.token;
  }, 100000);

  it("succeeds if content valid", async () => {
    const newTask = {
      title: "test",
      description: "test",
      project: 1,
    };
    await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("fails if missing title", async () => {
    const newTask = {
      title: "",
      description: "test",
      project: 1,
    };
    await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 100000);
}, 100000);

describe("When a user attemps to modify a task", () => {
  let token;
  let taskId;
  beforeAll(async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "dsabelli", password: "ArnoandLily1!" });

    token = response.body.token;
    const newTask = {
      title: "test",
      description: "test",
      project: 1,
    };
    const res = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);

    taskId = res.body.id;
  }, 100000);

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
  }, 100000);
}, 100000);

describe("When a user attemps to delete a task", () => {
  let token;
  let taskId;
  beforeAll(async () => {
    const response = await api
      .post("/api/login")
      .send({ username: "dsabelli", password: "ArnoandLily1!" });

    token = response.body.token;
    const newTask = {
      title: "test",
      description: "test",
      project: 1,
    };
    const res = await api
      .post("/api/tasks")
      .send(newTask)
      .set("Authorization", `bearer ${token}`);

    taskId = res.body.id;
  }, 100000);

  it("succeeds if found", async () => {
    const foundTask = await Task.findById(taskId);

    await api
      .delete(`/api/tasks/${foundTask._id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
  }, 100000);
}, 100000);
afterAll(() => {
  mongoose.connection.close();
});
