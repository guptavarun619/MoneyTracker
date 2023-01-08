const {
  TransactionRepository,
  LedgerRepository,
  UserRepository,
} = require("../repository/index");
const { verifyToken } = require("./user-service");

const transactionRepository = new TransactionRepository();
const ledgerRepository = new LedgerRepository();
const userRepository = new UserRepository();

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

const getAll = async (authToken, categoryId, orderByDate) => {
  try {
    const user = await verifyToken(authToken);
    const transactions = await transactionRepository.getAll({
      userId: user.id,
      categoryId: categoryId,
      orderByDate: orderByDate,
    });
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
