'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename columns to snake_case
    await queryInterface.renameColumn('company_links', 'compURL', 'comp_url');
    await queryInterface.renameColumn('company_links', 'companyId', 'company_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names back to original camelCase
    await queryInterface.renameColumn('company_links', 'comp_url', 'compURL');
    await queryInterface.renameColumn('company_links', 'company_id', 'companyId');
  }
};
