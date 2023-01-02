'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       User.hasMany(models.Product, {
        as: 'Products',
        foreignKey: {
          name: 'id_User',
        },
      });

      User.hasMany(models.Transaction, {
        as: 'Transactions',
        foreignKey: {
          name: 'id_User',
        },
      });

      User.hasMany(models.Order, {
        as: 'Orders',
        foreignKey: {
          name: 'id_User',
        },
      });

    }
  }
  User.init({
    user: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};