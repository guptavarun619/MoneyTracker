const express = require("express");
const bodyParser = require("body-parser");

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { UserService } = require("./services");
const db = require("./models");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Money Tracker API server listening at PORT : ${PORT}`);

    if (DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

initializeServer();
