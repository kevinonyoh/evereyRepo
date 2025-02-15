'use strict';

import { Permission } from "../../interfaces/model.interface";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable("admins", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: new Sequelize.STRING(128),
        allowNull: false
    },
    
    email: {
        type: new Sequelize.STRING(128),
        allowNull: false
    },

    permission: {
        type: new Sequelize.ENUM(Permission.OPERATIONAL, Permission.SUPERADMIN),
        allowNull: false
    },

    password: {
        type: new Sequelize.STRING(128),
        allowNull: true
    },

    status: {
      type: new Sequelize.BOOLEAN,
      defaultValue: false
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};