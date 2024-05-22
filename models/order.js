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
      models.Order.belongsTo(models.User,{
        foreignKey:{
          allowNull:false,
        },
        as:'user'
      });
      models.Order.hasMany(models.OrderItem);
      models.Order.hasOne(models.Payment)
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DOUBLE,
    orderItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};