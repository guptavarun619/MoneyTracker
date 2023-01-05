const express = require("express");
const { UserController } = require("../../controllers");
const { UserService } = require("../../services");

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

module.exports = router;
