const { Transaction } = require("../models/index");
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
}

module.exports = TransactionRepository;
