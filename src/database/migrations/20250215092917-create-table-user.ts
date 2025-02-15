'use strict';

import {  AcademicRole, Gender } from "../../interfaces/model.interface";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable("users", {


      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    first_name: {
        type:  Sequelize.STRING(128),
        allowNull: false,
    },

    last_name: {
        type: Sequelize.STRING(128),
        allowNull: false,
    },

   phone_number: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   email: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique   : true
   },

   profile_url: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   password: {
    type: Sequelize.STRING(128),
    allowNull: true
   },
    
   gender: {
    type: Sequelize.ENUM(Gender.MALE, Gender.FEMALE),
    allowNull: true
   },

   organisation: {
    type: Sequelize.STRING(128),
    allowNull: true
   },
   
   department: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   level: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   cv: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   language: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   purpose_of_research: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   academic_role: {
    type:Sequelize.ENUM(AcademicRole.LECTURER, AcademicRole.RESEARCHER, AcademicRole.STUDENT),
    allowNull: false
   },

   linkedin_url: {
    type: Sequelize.STRING(128),
    allowNull: true
   },

   research_gate_url: {
    type: Sequelize.STRING,
    allowNull: true
   },

   is_reseacher: {
     type: Sequelize.BOOLEAN,
     allowNull: false,
     defaultValue: false
   },
   
   is_subscribe: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
   },

   is_email_verified: {
     type: Sequelize.BOOLEAN,
     defaultValue: false
   },

   institution_id: {
    type: Sequelize.UUID,
    allowNull: true, 
    references: {
      model: "institutions",  
      key: 'id'
    }
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