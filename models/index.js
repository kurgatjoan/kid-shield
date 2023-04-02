const Sequelize = require("sequelize");
require("dotenv").config();

const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: "0",
    pool: DB_POOL,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require("./userModel")(sequelize, Sequelize);

module.exports = db;
