'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TravelPlannings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      travelDestinationProvince: {
        type: Sequelize.STRING
      },
      travelDestinationCity: {
        type: Sequelize.STRING
      },
      travelDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TravelPlannings');
  }
};