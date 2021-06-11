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
    travelDestinationProvince: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Please Provide Travel Destination"
        }
      }
    },
    travelDestinationCity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Please Provide Travel City"
        }
      }
    },
    travelDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Please Provide Travel Date"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          message: "Please Provide UserId"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TravelPlanning',
  });
  return TravelPlanning;
};