'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  }
  Payment.init({
    amount: DataTypes.DOUBLE,
    method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};