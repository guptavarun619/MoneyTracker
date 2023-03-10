const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async addFriendship(data) {
    try {
      const user1 = await User.findByPk(data.userId1);
      const user2 = await User.findByPk(data.userId2);
      user1.addFriend(user2);
      user2.addFriend(user1);
      return true;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async getFriends(userId) {
    try {
      const user = await User.findByPk(userId);
      const friends = user.getFriend();
      return friends;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async getAll() {
    try {
      const users = await User.findAll({
        attributes: ["id", "username"],
      });
      return users;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }

  async getByUsername(username) {
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      return user;
    } catch (error) {
      console.log("Erorr in user repository");
      throw error;
    }
  }
}

module.exports = UserRepository;
