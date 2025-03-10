'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Renaming columns to snake_case

    await queryInterface.renameColumn('applicant_overview', 'linkedIn', 'linked_in');
    await queryInterface.renameColumn('applicant_overview', 'createdAt', 'created_at');
    await queryInterface.renameColumn('applicant_overview', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting table and column names back to original camelCase
    await queryInterface.renameTable('applicant_overview', 'EmployeesOverview');
    
    await queryInterface.renameColumn('applicant_overview', 'employee_id', 'employeeId');
    await queryInterface.renameColumn('applicant_overview', 'description', 'description');
    await queryInterface.renameColumn('applicant_overview', 'bio', 'bio');
    await queryInterface.renameColumn('applicant_overview', 'visibility', 'visibility');
    await queryInterface.renameColumn('applicant_overview', 'linked_in', 'linkedIn');
    await queryInterface.renameColumn('applicant_overview', 'twitter', 'twitter');
    await queryInterface.renameColumn('applicant_overview', 'github', 'github');
    await queryInterface.renameColumn('applicant_overview', 'created_at', 'createdAt');
    await queryInterface.renameColumn('applicant_overview', 'updated_at', 'updatedAt');
  },
};
