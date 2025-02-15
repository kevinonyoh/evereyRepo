'use strict';

import { publicationType, researchCategory, statusPublish } from "../../interfaces/model.interface";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("articles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
  
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      abstract: {
        type: Sequelize.TEXT,
        allowNull: false
      },
  
      publication_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      doi_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      category: {
        type: Sequelize.ENUM(researchCategory.BUSINESS, researchCategory.ENGINEERING, researchCategory.ENVIRONMENTAL, researchCategory.MEDICAL, researchCategory.SCIENCE, researchCategory.SOCIAL),
        allowNull: false
      },
  
      sub_category: {
        type: Sequelize.STRING,
        allowNull: false
      },
  
      publication_type: {
        
        type: Sequelize.ENUM(
          publicationType.BOOK_CHAPTER,
          publicationType.CASE_STUDIES,
          publicationType.CONFERENCE_PAPER,
          publicationType.DISSERATATIONS,
          publicationType.LITERATURE_REVIEW,
          publicationType.POLICY_BRIEFS,
          publicationType.RESEARCH_PAPER,
          publicationType.TECHNICAL_REPORTS,
          publicationType.THESIS,
          publicationType.WHITE_PAPER
          ),
        
        allowNull: false
  
      },
  
      publication_date: {
  
        type: Sequelize.DATE,
      
        allowNull: true, 
      },
  
  
      status: {
        type: Sequelize.ENUM(statusPublish.DRAFT, statusPublish.PUBLISHED, statusPublish.REJECTED, statusPublish.UNDER_REVIEW),
        defaultValue: statusPublish.DRAFT
      },
  
      file_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
  
      file_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
  
      cloudinary_public_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
  
      user_id: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: "users",  
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