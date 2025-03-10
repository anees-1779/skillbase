'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename columns to snake_case
    await queryInterface.renameColumn('job', 'applicantCount', 'applicant_count');
    await queryInterface.renameColumn('job', 'companyId', 'company_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names back to original camelCase
    await queryInterface.renameColumn('job', 'applicant_count', 'applicantCount');
    await queryInterface.renameColumn('job', 'company_id', 'companyId');
  }
};
