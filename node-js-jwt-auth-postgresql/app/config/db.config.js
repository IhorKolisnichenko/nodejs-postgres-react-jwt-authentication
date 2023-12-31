module.exports = {
  HOST: "127.0.0.1",
  USER: "postgres",
  PASSWORD: "postgres",
  PORT: "5432",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
