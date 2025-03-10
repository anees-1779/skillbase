'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.renameColumn('job_application', 'interviewDate', 'interview_date');
    await queryInterface.renameColumn('job_application', 'interviewLink', 'interview_link');
    await queryInterface.renameColumn('job_application', 'createdAt', 'created_at');
    await queryInterface.renameColumn('job_application', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the column names back to camelCase
    await queryInterface.renameColumn('job_application', 'job_id', 'jobId');
    await queryInterface.renameColumn('job_application', 'company_id', 'companyId');
    await queryInterface.renameColumn('job_application', 'user_id', 'userId');
    await queryInterface.renameColumn('job_application', 'cv', 'CV');
    await queryInterface.renameColumn('job_application', 'interview_date', 'interviewDate');
    await queryInterface.renameColumn('job_application', 'interview_link', 'interviewLink');
    await queryInterface.renameColumn('job_application', 'created_at', 'createdAt');
    await queryInterface.renameColumn('job_application', 'updated_at', 'updatedAt');
  }
};
