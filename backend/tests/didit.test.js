const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

const Project = require("../models/project");
const Didit = require("../models/didit");

describe("When a user attempts to create a didit", () => {
  let token;
  let projectId;
  beforeAll(async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Didit.deleteMany({});

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
    const newDidit = {
      title: "Test Didit",
      project: projectId,
    };

    await api
      .post("/api/didits")
      .send(newDidit)
      .set("Authorization", `bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if title is missing", async () => {
    const newDidit = {
      title: "",
      project: projectId,
    };

    await api
      .post("/api/didits")
      .send(newDidit)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if project is missing", async () => {
    const newDidit = {
      title: "Test Didit",
      project: "",
    };

    await api
      .post("/api/didits")
      .send(newDidit)
      .set("Authorization", `bearer ${token}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("When a user attemps to get a didit", () => {
  let token;
  let projectId;
  let didit;

  beforeAll(async () => {
    await Didit.deleteMany({});
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
    console.log(response.user);

    const project = {
      title: "Test Project",
    };
    const res = await api
      .post("/api/projects")
      .send(project)
      .set("Authorization", `bearer ${token}`);

    projectId = res.body.id;

    const newDidit = {
      title: "test",
      description: "test",
      project: projectId,
    };
    const r = await api
      .post("/api/didits")
      .send(newDidit)
      .set("Authorization", `bearer ${token}`);

    didit = r.body;
  });

  it("succeeds if project query found", async () => {
    await api
      .get(`/api/didits?project=${projectId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("succeeds if title query found", async () => {
    await api
      .get(`/api/didits?title=${didit.title}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("succeeds if title and date query found", async () => {
    await api
      .get(
        `/api/didits?title=${didit.title}&dateA=${new Date(
          1970
        )}&dateB=${new Date()}`
      )
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if no project or title or dateA/dateB", async () => {
    const response = await api
      .get(`/api/didits?title=notARealTitle`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).not.toBe();
  });

  it("fails if empty query string", async () => {
    await api
      .get(`/api/didits`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);
  });

  it("succeeds if didit id found", async () => {
    const newDidit = {
      title: "Test Didit",
      project: projectId,
    };
    const response = await api
      .post("/api/didits")
      .send(newDidit)
      .set("Authorization", `bearer ${token}`);

    didit = response.body;

    await api
      .get(`/api/didits/${didit.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("fails if didit id not found", async () => {
    let notReal = "92d6d4d5ce37e7f3c87558f1";
    await api
      .get(`/api/didits/${notReal}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
