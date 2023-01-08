"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, { as: "Friend", through: "Friendship" });
      this.belongsToMany(models.User, {
        through: models.Ledger,
        as: "ledger",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const encryptedPassowrdHash = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassowrdHash;
  });

  return User;
};
