const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

//test email??
describe("When attempting to get a user's settings", () => {
  let token;
  let userId;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      email: "dsabelli@gmail.com",
      username: "dsabelli",
      passwordHash,
      verified: true,
      vToken: "abc123",
      settings: {
        dateFormat: "MMM-dd-yyyy",
        theme: "light",
        sortBy: "dueDate",
        order: "ascending",
      },
    });

    await user.save();

    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;

    userId = response.body.id;
  });
  it("succeeds to get dateFormat setting", async () => {
    const res = await api
      .get(`/api/users/${userId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(200);

    expect(res.body.settings[0].dateFormat).toBe("MMM-dd-yyyy");
  });
});

describe("When a user attempts to change their settings", () => {
  let token;
  let userId;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      email: "dsabelli@gmail.com",
      username: "dsabelli",
      passwordHash,
      verified: true,
      vToken: "abc123",
      settings: {
        dateFormat: "MMM-dd-yyyy",
        theme: "light",
        sortBy: "dueDate",
        order: "ascending",
      },
    });

    await user.save();

    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;

    userId = response.body.id;
  });
  it("succeeds to change dateFormat setting", async () => {
    const newDateFormat = { settings: { dateFormat: "dd-MMM-yyyy" } };
    const res = await api
      .put(`/api/users/${userId}`)
      .send(newDateFormat)
      .set("Authorization", `bearer ${token}`)
      .expect(200);
    expect(res.body.settings[0].dateFormat).toBe("dd-MMM-yyyy");
  });
});

describe("When a user attempts to change their password", () => {
  let token;
  let vToken = "abc123";

  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      email: "dsabelli@gmail.com",
      username: "dsabelli",
      passwordHash,
      verified: true,
      vToken: "abc123",
      settings: {
        dateFormat: "MMM-dd-yyyy",
        theme: "light",
        sortBy: "dueDate",
        order: "ascending",
      },
    });

    await user.save();

    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;
  });

  it("succeeds to update password if passwords match and vtoken matches", async () => {
    const newPassword = {
      password: "LilyandArno1!",
      confirmPassword: "LilyandArno1!",
    };
    await api
      .put(`/api/users/confirm-reset/${vToken}`)
      .send(newPassword)
      .set("Authorization", `bearer ${token}`)
      .expect(200);
  });
  it("fails to update password if passwords don't match", async () => {
    const newPassword = {
      password: "LilyandArno1!",
      confirmPassword: "LilyandArno1@",
    };
    await api
      .put(`/api/users/confirm-reset/${vToken}`)
      .send(newPassword)
      .set("Authorization", `bearer ${token}`)
      .expect(400);
  });
  it("fails to update password if vtoken doesn't match", async () => {
    const newPassword = {
      password: "LilyandArno1!",
      confirmPassword: "LilyandArno1!",
    };
    await api
      .put(`/api/users/confirm-reset/abc321`)
      .send(newPassword)
      .set("Authorization", `bearer ${token}`)
      .expect(403);
  });
});

describe("When a user attempts to delete their account", () => {
  let token;
  let userId;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("ArnoandLily1!", 10);
    const user = new User({
      email: "dsabelli@gmail.com",
      username: "dsabelli",
      passwordHash,
      verified: true,
      vToken: "abc123",
      settings: {
        dateFormat: "MMM-dd-yyyy",
        theme: "light",
        sortBy: "dueDate",
        order: "ascending",
      },
    });

    await user.save();

    const response = await api
      .post("/api/login")
      .send({ email: "dsabelli@gmail.com", password: "ArnoandLily1!" })
      .expect(200);

    token = response.body.token;

    userId = response.body.id;
  });
  it("succeeds if found", async () => {
    await api
      .delete(`/api/users/${userId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
