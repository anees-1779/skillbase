'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename columns to snake_case
    await queryInterface.renameColumn('company', 'No_of_Emp', 'no_of_emp');
    await queryInterface.renameColumn('company', 'No_of_Job', 'no_of_job');
    await queryInterface.renameColumn('company', 'techStack', 'tech_stack');
    await queryInterface.renameColumn('company', 'foundedIn', 'founded_in');
    await queryInterface.renameColumn('company', 'CEO', 'ceo');

    // Ensure timestamps are in snake_case
    await queryInterface.renameColumn('company', 'createdAt', 'created_at');
    await queryInterface.renameColumn('company', 'updatedAt', 'updated_at');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the column renaming if needed
    await queryInterface.renameColumn('company', 'no_of_emp', 'No_of_Emp');
    await queryInterface.renameColumn('company', 'no_of_job', 'No_of_Job');
    await queryInterface.renameColumn('company', 'tech_stack', 'techStack');
    await queryInterface.renameColumn('company', 'founded_in', 'foundedIn');
    await queryInterface.renameColumn('company', 'ceo', 'CEO');
    await queryInterface.renameColumn('company', 'created_at', 'createdAt');
    await queryInterface.renameColumn('company', 'updated_at', 'updatedAt');
  }
};
