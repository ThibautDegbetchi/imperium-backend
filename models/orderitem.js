'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.OrderItem.belongsTo(models.Order, {
        foreignKey: {
          allowNull: false,
        },
        as:'order'
      });
      models.OrderItem.belongsTo(models.Product,{
        foreignKey:'productId',
        as:'product'
      })
    }
  }
  OrderItem.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subTotal: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};