const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_SYNC: process.env.DB_SYNC,
  JWT_KEY: process.env.JWT_KEY,
  SALT: bcrypt.genSaltSync(15),
};
