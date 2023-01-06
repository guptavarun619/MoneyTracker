const { TransactionRepository } = require("../repository/index");

const transactionRepository = new TransactionRepository();

const create = async (data) => {
  try {
    const transaction = transactionRepository.create(data);
    return transaction;
  } catch (error) {
    console.log("Error in transaction service");
    throw error;
  }
};

const destory = async (transactionId) => {
  try {
    const response = transactionRepository.destroy(transactionId);
    return response;
  } catch (error) {
    console.log("Error in transaction service");
    throw error;
  }
};

module.exports = {
  create,
  destory,
};
