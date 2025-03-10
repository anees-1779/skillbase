'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('applicant_experience', 'employeeId', 'employee_id');
    await queryInterface.renameColumn('applicant_experience', 'empType', 'emp_type');
    await queryInterface.renameColumn('applicant_experience', 'compName', 'comp_name');
    await queryInterface.renameColumn('applicant_experience', 'startDate', 'start_date');
    await queryInterface.renameColumn('applicant_experience', 'endDate', 'end_date');
    await queryInterface.renameColumn('applicant_experience', 'createdAt', 'created_at');
    await queryInterface.renameColumn('applicant_experience', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('applicant_experience', 'employee_id', 'employeeId');
    await queryInterface.renameColumn('applicant_experience', 'emp_type', 'empType');
    await queryInterface.renameColumn('applicant_experience', 'comp_name', 'compName');
    await queryInterface.renameColumn('applicant_experience', 'start_date', 'startDate');
    await queryInterface.renameColumn('applicant_experience', 'end_date', 'endDate');
    await queryInterface.renameColumn('applicant_experience', 'created_at', 'createdAt');
    await queryInterface.renameColumn('applicant_experience', 'updated_at', 'updatedAt');
  },
};
