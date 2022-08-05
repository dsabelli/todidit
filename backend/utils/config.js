require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_CLOUD_URI;
const SECRET = process.env.SECRET;
const EMAIL_SECRET = process.env.EMAIL_SECRET;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  EMAIL_SECRET,
  SENDGRID_API_KEY,
};
