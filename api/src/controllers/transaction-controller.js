const { TransactionService } = require("../services");

const create = async (req, res) => {
  try {
    console.log(req.body);
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

module.exports = {
  create,
};
