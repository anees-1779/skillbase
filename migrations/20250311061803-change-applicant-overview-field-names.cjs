'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.renameColumn('applicant_overview', 'employee_id', 'applicant_id');
    await queryInterface.renameColumn('applicant_overview', 'linked_in', 'linkedin');

  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column names back to original names
    await queryInterface.renameColumn('applicant_overview', 'applicant_id', 'employee_id');
    await queryInterface.renameColumn('applicant_overview', 'linkedin', 'linked_in');
  }
};
