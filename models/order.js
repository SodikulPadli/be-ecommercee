'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Order.belongsTo(models.User, {
        as: 'Users',
        foreignKey: {
          name: 'id_User',
        },
      });
      Order.belongsTo(models.Product, {
       as: 'Products',
        foreignKey: {
          name: 'id_Product',
        },
      });
      Order.hasMany(models.Transaction, {
        as: 'Transactions',
        foreignKey: {
          name: 'id_Order',
        },
      });
    }
  }
  Order.init({
    id_User: DataTypes.INTEGER,
    id_Product: DataTypes.INTEGER,
    order_Qty: DataTypes.INTEGER,
    status:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};