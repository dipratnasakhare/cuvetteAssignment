const { sequelize } = require("../db");
const Sequelize = require("sequelize");

const Auth = sequelize.define("users", {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = Auth;
