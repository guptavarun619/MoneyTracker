const { TransactionService } = require("../services");

const create = async (req, res) => {
  try {
    const response = await TransactionService.create({
      amount: req.body.amount,
      paidById: req.body.paidById,
      categoryId: req.body.categoryId,
      users: req.body.users,
    });
    res.status(201).json({
      success: true,
      message: "Transaction Successfully created",
      data: response,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transaction cannot be created, try later",
      data: {},
      err: { error },
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await TransactionService.getAll({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      orderByDate: req.body.orderByDate,
    });
    res.status(200).json({
      success: true,
      message: "Transactions Successfully fetched",
      data: response,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transactions cannot be fetched, try later",
      data: {},
      err: { error },
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await TransactionService.destory(req.params.id);
    res.status(200).json({
      success: true,
      message: "Transaction has been deleted successfully",
      data: { response },
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Transaction cannot be deleted, try later",
      data: {},
      err: { error },
    });
  }
};

module.exports = {
  create,
  getAll,
  destroy,
};
