const express = require("express");
const bodyParser = require("body-parser");

const { PORT, DB_SYNC } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const db = require("./models");
const { LedgerRepository, TransactionRepository } = require("./repository");

const app = express();

const initializeServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Money Tracker API server listening at PORT : ${PORT}`);

    // if (DB_SYNC) {
    //   db.sequelize.sync({ alter: true });
    // }

    const ledgerRepository = new LedgerRepository();
    const transactionRepository = new TransactionRepository();
    const reqData = {
      userId: 2,
      // categoryId: 1,
      orderByDate: "DESC",
    };
    // const response = await ledgerRepository.getAllByTransaction(reqData);
    // const response = await ledgerRepository.getAllByUser(reqData);
    // console.log(response);
  });
};

initializeServer();
