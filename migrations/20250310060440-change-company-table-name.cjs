'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Company', 'company');
    await queryInterface.renameTable('CompanyLinks', 'company_links');
    await queryInterface.renameTable('EmpEducation', 'applicant_education');
    await queryInterface.renameTable('EmpExperience', 'applicant_experience');
    await queryInterface.renameTable('EmpPreference', 'applicant_preference');
    await queryInterface.renameTable('Employee', 'applicant');
    await queryInterface.renameTable('Job', 'job');
    await queryInterface.renameTable('JobApplications', 'job_application');
    await queryInterface.renameTable('EmployeesOverview', 'applicant_overview');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting all table renames to their original names
    await queryInterface.renameTable('company', 'Company');
    await queryInterface.renameTable('company_links', 'CompanyLinks');
    await queryInterface.renameTable('applicant_education', 'EmpEducation');
    await queryInterface.renameTable('applicant_experience', 'EmpExperience');
    await queryInterface.renameTable('applicant_preference', 'EmpPreference');
    await queryInterface.renameTable('applicant', 'Employee');
    await queryInterface.renameTable('job', 'Job');
    await queryInterface.renameTable('job_application', 'JobApplications');
    await queryInterface.renameTable('applicant_overview', 'EmployeesOverview');
  }
};
