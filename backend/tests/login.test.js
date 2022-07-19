const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("When a user attempts to login", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash1 = await bcrypt.hash("ArnoandLily1!", 10);
    const passwordHash2 = await bcrypt.hash("ArnoandLily2!", 10);
    const user1 = new User({
      username: "dsabelli",
      email: "dsabelli@gmail.com",
      passwordHash: passwordHash1,
      verified: true,
      vToken: "abc123",
    });
    const user2 = new User({
      username: "vsabelli",
      email: "vsabelli@gmail.com",
      passwordHash: passwordHash2,
      vToken: "def456",
    });
    user1.save();
    user2.save();
    // await api.post("/register").send(newUser).expect(201);
  }, 100000);

  it("login fails if password is wrong", async () => {
    const newUser = {
      email: "dsabelli@gmail.com",
      password: "hi",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("login fails if email does not exist", async () => {
    const newUser = {
      email: "psabelli@gmail.com",
      password: "ArnoandLily1!",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("login fails if email is not verified", async () => {
    const newUser = {
      email: "vsabelli@gmail.com",
      password: "ArnoandLily2!",
    };
    await api
      .post("/api/login")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("login succeeds with correct credentials and verified email", async () => {
    const user = {
      email: "dsabelli@gmail.com",
      password: "ArnoandLily1!",
    };
    await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
