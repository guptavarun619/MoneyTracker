const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const { UserService } = require("./services");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Money Tracker API server listening at PORT : ${PORT}`);

    UserService.create({
      username: "varun",
      password: "pass1234",
    });
  });
};

initializeServer();
