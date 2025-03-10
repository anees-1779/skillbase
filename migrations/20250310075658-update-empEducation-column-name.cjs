"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename columns to snake_case
    await queryInterface.renameColumn("applicant_education", "employeeId", "employee_id");
    await queryInterface.renameColumn("applicant_education", "feildOfStudy", "field_of_study");
    await queryInterface.renameColumn("applicant_education", "startyear", "start_year");
    await queryInterface.renameColumn("applicant_education", "endYear", "end_year");
    await queryInterface.renameColumn("applicant_education", "GPA", "gpa");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column names to their original case
    await queryInterface.renameColumn("applicant_education", "employee_id", "employeeId");
    await queryInterface.renameColumn("applicant_education", "field_of_study", "feildOfStudy");
    await queryInterface.renameColumn("applicant_education", "start_year", "startyear");
    await queryInterface.renameColumn("applicant_education", "end_year", "endYear");

  }
};
