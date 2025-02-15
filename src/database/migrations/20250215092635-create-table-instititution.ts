'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("institutions", {
     
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: new Sequelize.STRING(128),
        allowNull: false,
        unique: true   
    },

    email: {
        type: new Sequelize.STRING(128),
        allowNull: false,
        unique: true
    },

    subscription_status: {
        type: new Sequelize.BOOLEAN,
        defaultValue: false
    },

    icon_url: {
        type: new Sequelize.STRING(128),
        allowNull: true
    },

    password: {
        type: new Sequelize.STRING(128),
        allowNull: false
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
   
    })
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('institutions');
     
  }
};