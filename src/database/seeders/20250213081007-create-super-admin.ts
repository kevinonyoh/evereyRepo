'use strict';

import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from "../../utils/passwordUtil";
import { Permission } from "../../interfaces/model.interface";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const hashedPassword = await hashPassword('password123');

     return queryInterface.bulkInsert('admins', [
      {
        id: uuidv4(),
        name: 'super admin',
        email: 'evionyoh@yahoo.com',
        permission: Permission.SUPERADMIN,
        password: hashedPassword,
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
     ], {});
  },

  async down (queryInterface, Sequelize) {
  
  }
};