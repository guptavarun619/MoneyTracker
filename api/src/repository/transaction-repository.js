const { Transaction, User } = require("../models/index");
const CatagoryRepository = require("./catagory-repository");
const UserRepository = require("./user-repository");
const LedgerRepository = require("./ledger-repository");
const { Op } = require("sequelize");

class TransactionRepository {
  constructor() {
    this.userRepository = new UserRepository();
    this.categoryRepository = new CatagoryRepository();
    this.ledgerRepository = new LedgerRepository();
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
      if (data.splitWith.length > 0) {
        let nofParticipants = 0;
        if (data.includePayer) {
          nofParticipants += 1;
        }
        nofParticipants += data.splitWith.length;
        const amountPerHead = data.amount / nofParticipants;

        data.splitWith.forEach(async (userId) => {
          try {
            const user = await this.userRepository.getById(userId);
            // check if the user is even friends with paidByUser
            const isFriends = await paidByUser.hasFriend(user);
            console.log("The are friends", isFriends);
            if (isFriends) {
              await this.ledgerRepository.create(
                user.id,
                transaction.id,
                amountPerHead
              );
            } else {
              console.log(
                "The participants of this transactions are not friends"
              );
              throw {
                error: "The participants of this transactions are not friends",
              };
            }
          } catch (error) {
            console.log("Error in adding to ledger");
            throw error;
          }
        });
      }

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

  async getById(transactionId) {
    try {
      const transaction = await Transaction.findByPk(transactionId);
      return transaction;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }

  async getAll(data) {
    try {
      const user = this.userRepository.getById(data.userId);
      if (!user) throw { error: "User not found in our DB" };
      const filter = [];
      filter.push({ UserId: data.userId });
      if (data.categoryId) filter.push({ CatagoryId: data.categoryId });
      const orderBy = [];
      if (data.orderByDate) orderBy.push(["createdAt", data.orderByDate]);
      const transaction = await Transaction.findAll({
        where: {
          [Op.and]: filter,
        },
        order: orderBy,
      });
      return transaction;
    } catch (error) {
      console.log("Erorr in transaction repository", error);
      throw error;
    }
  }
}

module.exports = TransactionRepository;
