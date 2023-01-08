const { UserRepository } = require("../repository/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");

const userRepository = new UserRepository();

const create = async (data) => {
  try {
    const user = await userRepository.create(data);
    return { username: user.username };
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

const signIn = async (username, plainPassword) => {
  try {
    // step1 -> fetcht he user using the username
    const user = await userRepository.getByUsername(username);
    // step2 -> compare incoming plain password with stored encrypted password
    const passwordMatch = verifyPassword(plainPassword, user.password);
    if (!passwordMatch) {
      console.log("Password doesn't match");
      throw { error: "Incorrect Password" };
    }

    // step3 -> if password match create a JWT and return it
    const newAuthToken = createToken({
      username: user.username,
      id: user.id,
    });
    return newAuthToken;
  } catch (error) {
    console.log("Something went wrong in the sign-in process (service layer)");
    throw error;
  }
};

const isAuthenticated = async (token) => {
  try {
    const response = verifyToken(token);
    if (!response) {
      throw { error: "Invalid Token" };
    }
    // whatever business logic to check if the user still exists in DB
    const user = await userRepository.getById(response.id);
    if (!user) {
      throw { error: "No user with the corresponding token exists" };
    }
    return user.id;
  } catch (error) {
    console.log("Something went wrong in the token authentication process");
    throw error;
  }
};

const verifyPassword = (plainPassword, encryptedPassowrd) => {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassowrd);
  } catch (error) {
    console.log(
      "Something went wrong in password verification (service layer)"
    );
    throw error;
  }
};

const createToken = (user) => {
  try {
    const authToken = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
    return authToken;
  } catch (error) {
    console.log("Something went wrong in token creation (service layer)");
    throw error;
  }
};

const verifyToken = (authToken) => {
  try {
    const jwtDecodedUser = jwt.verify(authToken, JWT_KEY);
    return jwtDecodedUser;
  } catch (error) {
    console.log("Something went wrong in token verification (service layer)");
    throw error;
  }
};

const getAll = async () => {
  try {
    const response = await userRepository.getAll();
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
  getAll,
  signIn,
  isAuthenticated,
};
