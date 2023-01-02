'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        as: 'Users',
        foreignKey: {
          name: 'id_User',
        },
      });
      Product.hasMany(models.Order, {
        as: 'Products',
        foreignKey: {
          name: 'id_Product',
        },
      });
      Product.hasMany(models.Transaction, {
        as: 'Transactions',
        foreignKey: {
          name: 'id_Product',
        },
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    image:DataTypes.STRING,
    id_User: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};