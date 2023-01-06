const { Transaction, User } = require("../models/index");
const CatagoryRepository = require("./catagory-repository");
const UserRepository = require("./user-repository");

class TransactionRepository {
  constructor() {
    this.userRepository = new UserRepository();
    this.categoryRepository = new CatagoryRepository();
  }
  async create(data) {
    try {
      const transaction = await Transaction.create({
        amount: data.amount,
      });

      // associate the transaction with owner who paid the transaction
      const paidByUser = await this.userRepository.getById(data.paidById);
      await paidByUser.addTransaction(transaction);

      // associate the transaction with coresponding category
      const category = await this.categoryRepository.getById(data.categoryId);
      await category.addTransaction(transaction);

      // associate the transaction with each billable user in 'ledger' model
      data.users.forEach(async (userId) => {
        try {
          const user = await this.userRepository.getById(userId);
          await user.addLedger(transaction);
          // await transaction.addLedger(user);
        } catch (error) {
          console.log("Error in adding to ledger");
          throw error;
        }
      });

      return transaction;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }

  async destroy(transactionId) {
    try {
      await Transaction.destroy({
        where: {
          id: transactionId,
        },
      });
      return true;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }

  async getAllTransactions(data) {
    try {
      const allLedgers = await this.getAllLedgers(data);
      const response = await Promise.all(
        allLedgers.map(async (ledger) => {
          /**
           * transactionId: ledger.id,
           * amount: ledger.amount,
           * category: ledger.CatagoryId,
           * paidBy: ledger.UserId
           */
          // console.log(
          //   ledger.id,
          //   ledger.amount,
          //   ledger.CatagoryId,
          //   ledger.UserId,
          //   data.userId
          // );
          try {
            const transaction = await Transaction.findOne({
              where: {
                id: ledger.Ledgers.TransactionId,
              },
            });
            const allParticipants = await transaction.getLedger();
            let amountOwed;
            if (allParticipants.length > 1) {
              const amountOwedByEach = ledger.amount / allParticipants.length;
              if (ledger.UserId == data.userId) {
                amountOwed = ledger.amount - amountOwedByEach;
              } else amountOwed = -amountOwedByEach;
            } else {
              amountOwed = 0;
            }
            // console.log(allParticipants.length);

            const result = {
              transactionId: ledger.id,
              amount: ledger.amount,
              owed: amountOwed,
              category: ledger.CatagoryId,
              paidBy: ledger.UserId,
            };
            return result;
          } catch (error) {
            console.log(
              "Error occured while getting transaction detail for ledger",
              error
            );
          }
        })
      );
      return response;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }

  async getAllLedgers(data) {
    try {
      const user = await this.userRepository.getById(data.userId);

      const filter = {};
      const orderBy = [];
      if (data.categoryId) filter.catagoryId = data.categoryId;
      if (data.orderByDate) orderBy.push(["updatedAt", data.orderByDate]);
      const ledgers = await user.getLedger({
        where: filter,
        order: orderBy,
      });

      return ledgers;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }
}

module.exports = TransactionRepository;
