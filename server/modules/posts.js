const { sequelize } = require("../db");
const Sequelize = require("sequelize");

const Posts = sequelize.define("posts", {
  title: Sequelize.STRING,
  desc: Sequelize.STRING,
  date: Sequelize.DATE,
  uid: Sequelize.NUMBER,
});

module.exports = Posts;
