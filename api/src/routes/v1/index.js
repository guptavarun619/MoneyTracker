const express = require("express");
const {
  UserController,
  CategoryController,
  TransactionController,
} = require("../../controllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get request recieved successfully",
    data: {},
    err: {},
  });
});

router.post("/authenticate", UserController.isAuthenticated);
router.post("/signup", UserController.create);
router.post("/signin", UserController.signIn);
router.get("/user", UserController.getAll);
router.post("/user/addFriends", UserController.createFriendship);
router.get("/user/getFriends/:id", UserController.getFriends);

router.post("/category", CategoryController.create);
router.get("/category", CategoryController.getAll);

router.post("/transaction", TransactionController.create);
router.get("/transaction", TransactionController.getAll);
router.delete("/transaction/:id", TransactionController.destroy);
router.get("/transaction/ledger/:id", TransactionController.getLedgers);

module.exports = router;
