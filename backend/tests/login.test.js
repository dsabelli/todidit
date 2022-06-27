const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("When a user attempts to login", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      username: "dsabelli",
      email: "dsabelli@gmail.com",
      passwordHash,
    });
    user.save();
    // await api.post("/register").send(newUser).expect(201);
  }, 100000);

  it("login fails if password is wrong", async () => {
    const newUser = {
      username: "dsabelli",
      password: "hi",
    };
    await api
      .post("/login")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("login fails if username does not exist", async () => {
    const newUser = {
      username: "psabelli",
      password: "hi",
    };
    await api
      .post("/login")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("login succeeds with correct credentials", async () => {
    const user = {
      username: "dsabelli",
      password: "ArnoandLily1!",
    };
    await api
      .post("/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
