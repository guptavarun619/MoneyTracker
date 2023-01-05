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

module.exports = {
  create,
};
