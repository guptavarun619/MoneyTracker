const { Ledger, User, Transaction } = require("../models/index");
const UserRepository = require("./user-repository");

class LedgerRepository {
  constructor() {
    this.userRepository = new UserRepository();
    // this.transactionRepository = new TransactionRepository();
  }
  async create(userId, transactionId, amountOwed) {
    try {
      const ledgerDraft = {
        UserId: userId,
        TransactionId: transactionId,
        amountOwed: amountOwed,
      };
      //   console.log({ ledgerDraft });
      const ledger = await Ledger.create(ledgerDraft);
      return ledger;
    } catch (error) {
      console.log("Erorr in ledger repository", error);
      throw error;
    }
  }

  async getAllByTransaction(data) {
    try {
      const user = await this.userRepository.getById(data.userId);
      const filter = {};
      const orderBy = [];
      if (data.categoryId) filter.catagoryId = data.categoryId;
      if (data.orderByDate) orderBy.push(["updatedAt", data.orderByDate]);
      const allTransactions = await user.getTransactions({
        where: filter,
        order: orderBy,
        include: [{ model: User }],
      });
      //   console.log(allTransactions);
      //   const ledger = await allTransactions[0].getLedger();
      //   console.log(ledger[0]);
      //   console.log(
      //     // user details - who owes
      //     ledger[0].id,
      //     ledger[0].username,
      //     ledger[0].password,
      //     // how much they own since when
      //     ledger[0].Ledger.TransactionId,
      //     ledger[0].Ledger.amountOwed,
      //     ledger[0].Ledger.updatedAt
      //   );
      //   return true;
      const allLedgers = [];
      //   console.log(allTransactions.length, typeof allTransactions);
      //   console.log(allTransactions[0], typeof allTransactions[0]);
      for (const key in allTransactions) {
        const transaction = allTransactions[key];
        const ledgers = await transaction.getLedger();
        for (const ledgerKey in ledgers) {
          const ledger = ledgers[ledgerKey];
          //   console.log(ledger);
          allLedgers.push({
            userId: ledger.id,
            username: ledger.username,
            // how much they own since when
            transactionId: ledger.Ledger.TransactionId,
            amountOwed: ledger.Ledger.amountOwed,
            updatedAt: ledger.Ledger.updatedAt,
            createdAt: ledger.Ledger.createdAt,
          });
        }
      }
      //   console.log("+ All Ledgers by user are :", allLedgers, allLedgers.length);
      return allLedgers;
    } catch (error) {
      console.log("Erorr in ledger repository", error);
      throw error;
    }
  }

  async getAllByUser(data) {
    try {
      // const user = await this.userRepository.getById(data.userId);
      const filter = {};
      const orderBy = [];
      if (data.userId) filter.UserId = data.userId;
      else {
        console.log("userId not provided");
      }
      if (data.orderByDate) orderBy.push(["updatedAt", data.orderByDate]);
      const ledgers = await Ledger.findAll({
        // where: {
        //   UserId: data.userId,
        // },
        where: filter,
        order: orderBy,
        include: Transaction,
      });
      //   console.log("- All Ledgers by user are :", ledgers);
      //   console.log(ledgers.length, ledgers[0]);

      const allLedgers = [];
      for (const ledgerKey in ledgers) {
        const ledger = ledgers[ledgerKey];
        // console.log("Ledger", ledger);
        const transactionId = ledger.TransactionId;
        const transaction = await Transaction.findByPk(transactionId, {
          include: User,
        });

        allLedgers.push({
          userId: transaction.User.id,
          username: transaction.User.username,
          // how much they own since when
          transactionId: ledger.TransactionId,
          amountOwed: -ledger.amountOwed,
          updatedAt: ledger.updatedAt,
          createdAt: ledger.createdAt,
        });
      }
      //   console.log("- All Ledgers by user are :", allLedgers, allLedgers.length);

      return allLedgers;
    } catch (error) {
      console.log("Erorr in ledger repository", error);
      throw error;
    }
  }
}

module.exports = LedgerRepository;
