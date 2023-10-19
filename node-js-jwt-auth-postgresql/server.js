const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const domainsFromEnv = process.env.CORS_DOMAINS || "";

const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node.js Server" });
});

// main routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Role = db.role;

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync DB");
    initial();
  })
  .catch((err) => {
    console.log("err: ", err);
  });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "moderator",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
}
