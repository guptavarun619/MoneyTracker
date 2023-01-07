const {
  TransactionRepository,
  LedgerRepository,
} = require("../repository/index");

const transactionRepository = new TransactionRepository();
const ledgerRepository = new LedgerRepository();

const create = async (data) => {
  try {
    if (data.includePayerd) data.splitWith.push(data.paidById);
    const transaction = transactionRepository.create(data);
    return transaction;
  } catch (error) {
    console.log("Error in transaction service");
    throw error;
  }
};

const getAll = async (data) => {
  try {
    const transactions = transactionRepository.getAll(data);
    return transactions;
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

const getLedgers = async (data) => {
  try {
    // console.log(data);
    const lent = await ledgerRepository.getAllByTransaction(data);
    const owed = await ledgerRepository.getAllByUser(data);
    response = {
      lent: lent,
      owed: owed,
    };
    return response;
  } catch (error) {
    console.log("Error in transaction service");
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  destory,
  getLedgers,
};
