const { UserRepository } = require("../repository/index");

userRepository = new UserRepository();

const create = async (data) => {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (error) {
    console.log("Erorr in user service");
    throw error;
  }
};

const addFreindship = async (data) => {
  try {
    const response = await userRepository.addFriendship(data);
    return response;
  } catch (error) {
    console.log("Erorr in user service");
    throw error;
  }
};

const getFriends = async (userId) => {
  try {
    const response = await userRepository.getFriends(userId);
    return response;
  } catch (error) {
    console.log("Erorr in user service");
    throw error;
  }
};

module.exports = {
  create,
  addFreindship,
  getFriends,
};
