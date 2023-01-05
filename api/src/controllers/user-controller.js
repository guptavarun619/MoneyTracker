const { UserService } = require("../services");

const create = async (req, res) => {
  try {
    const response = await UserService.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json({
      success: true,
      data: response,
      message: "User has been created successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "User can not be created",
      err: error,
    });
  }
};

const createFriendship = async (req, res) => {
  try {
    const response = await UserService.addFreindship({
      userId1: req.body.userId1,
      userId2: req.body.userId2,
    });
    res.status(201).json({
      success: true,
      data: response,
      message: "Friendship has been created successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Friendship cannot be created",
      err: error,
    });
  }
};

const getFriends = async (req, res) => {
  try {
    const response = await UserService.getFriends(req.params.id);
    res.status(200).json({
      success: true,
      data: response,
      message: "Friends have been fetched successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Friends cannot be fetched",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await UserService.getAll();
    res.status(200).json({
      success: true,
      data: response,
      message: "All Users have been fetched successfully",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "All Users cannot be fetched",
      err: error,
    });
  }
};

module.exports = {
  create,
  createFriendship,
  getFriends,
  getAll,
};
