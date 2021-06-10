'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelPlanning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // TravelPlanning.belongsTo(models.User, { foreignKey: 'userId' })
    }
  };
  TravelPlanning.init({
    travelDestinationProvince: DataTypes.STRING,
    travelDestinationCity: DataTypes.STRING,
    travelDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelPlanning',
  });
  return TravelPlanning;
};