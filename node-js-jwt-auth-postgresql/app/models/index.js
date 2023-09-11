const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.PORT}/${config.DB}`,
  {
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to testdb");
  })
  .catch((err) => {
    console.log("DB err: ", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
