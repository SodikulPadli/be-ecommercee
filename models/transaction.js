'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: 'Users',
        foreignKey: {
          name: 'id_User',
        },
      });
      Transaction.belongsTo(models.Product, {
        as: 'Products',
        foreignKey: {
          name: 'id_Product',
        },
      });
      Transaction.belongsTo(models.Order, {
        as: 'Orders',
        foreignKey: {
          name: 'id_Order',
        },
      });
    }
  }
  Transaction.init({
    id_Order: DataTypes.INTEGER,
    id_User: DataTypes.INTEGER,
    id_Product: DataTypes.INTEGER,
    total_amount_transaction: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};