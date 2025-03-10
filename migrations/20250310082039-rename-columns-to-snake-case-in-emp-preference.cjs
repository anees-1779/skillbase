'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Renaming columns to snake_case
    await queryInterface.renameColumn('applicant_preference', 'employeeId', 'employee_id');
    await queryInterface.renameColumn('applicant_preference', 'typeOfJob', 'type_of_job');
    await queryInterface.renameColumn('applicant_preference', 'experienceLevel', 'experience_level');
    await queryInterface.renameColumn('applicant_preference', 'jobSearchStatus', 'job_search_status');
    await queryInterface.renameColumn('applicant_preference', 'workAuthorization', 'work_authorization');
    await queryInterface.renameColumn('applicant_preference', 'expectedSalary', 'expected_salary');
    await queryInterface.renameColumn('applicant_preference', 'equityPreference', 'equity_preference');
    await queryInterface.renameColumn('applicant_preference', 'createdAt', 'created_at');
    await queryInterface.renameColumn('applicant_preference', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting table and column names back to original camelCase
    await queryInterface.renameTable('applicant_preference', 'EmpPreference');
    
    await queryInterface.renameColumn('applicant_preference', 'employee_id', 'employeeId');
    await queryInterface.renameColumn('applicant_preference', 'type_of_job', 'typeOfJob');
    await queryInterface.renameColumn('applicant_preference', 'experience_level', 'experienceLevel');
    await queryInterface.renameColumn('applicant_preference', 'job_search_status', 'jobSearchStatus');
    await queryInterface.renameColumn('applicant_preference', 'work_authorization', 'workAuthorization');
    await queryInterface.renameColumn('applicant_preference', 'expected_salary', 'expectedSalary');
    await queryInterface.renameColumn('applicant_preference', 'equity_preference', 'equityPreference');
    await queryInterface.renameColumn('applicant_preference', 'created_at', 'createdAt');
    await queryInterface.renameColumn('applicant_preference', 'updated_at', 'updatedAt');
  },
};
