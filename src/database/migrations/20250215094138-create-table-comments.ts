'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable("comments", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      article_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "articles",
          key: "id",
        },
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [1, 500],
        },
      },
      
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
    
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
        
      }
    )
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('comments');
     
  }
};