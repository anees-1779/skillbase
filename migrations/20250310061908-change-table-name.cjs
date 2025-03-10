'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Renaming tables with correct syntax
    await queryInterface.renameTable('EmpExperience', 'applicant_experience');
    await queryInterface.renameTable('EmpPreference', 'applicant_preference');
    await queryInterface.renameTable('EmployeesOverview', 'applicant_overview');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the renaming if needed
    await queryInterface.renameTable('applicant_experience', 'EmpExperience');
    await queryInterface.renameTable('applicant_preference', 'EmpPreference');
    await queryInterface.renameTable('applicant_overview', 'EmployeesOverview');
  }
};
