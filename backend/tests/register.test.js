const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("When a user registers", () => {
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

  it("register succeeds if unique username and email and strong password", async () => {
    const newUser = {
      username: "vsabelli",
      email: "vsabelli@gmail.com",
      password: "ArbyandAsh1!",
    };
    await api
      .post("/register")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("register fails if password is not strong", async () => {
    const newUser = {
      username: "vsabelli",
      email: "vsabelli@gmail.com",
      password: "hi",
    };
    await api
      .post("/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("register fails if username not unique", async () => {
    const newUser = {
      username: "dsabelli",
      email: "uniqueEmail@gmail.com",
      password: "TheStrongestp@55word!",
    };
    await api
      .post("/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  it("register fails if email not unique", async () => {
    const newUser = {
      username: "dsabelli1",
      email: "dsabelli@gmail.com",
      password: "TheStrongestp@55word!",
    };
    await api
      .post("/register")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
