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
      models.Product.belongsTo(models.OrderItem,{
        foreignKey:'productId',
        as:'product'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    descrpition: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};