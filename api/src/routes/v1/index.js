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

router.post("/user", UserController.create);
router.post("/user/addFriends", UserController.createFriendship);
router.get("/user/getFriends/:id", UserController.getFriends);
router.get("/user/all", UserController.getAll);

router.post("/category", CategoryController.create);
router.get("/category", CategoryController.getAll);

router.post("/transaction", TransactionController.create);
router.delete("/transaction/:id", TransactionController.destroy);

module.exports = router;
