const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get request recieved successfully",
    data: {},
    err: {},
  });
});

module.exports = router;
