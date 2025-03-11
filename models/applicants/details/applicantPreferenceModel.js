import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import { applicant } from './../details/applicantModel.js';

const applicantPreference = sequelize.define('applicant_preference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  applicant_id: { // Foreign key referencing applicant table
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: applicant, // Reference to applicant model
      key: 'id',
    },
  },
  type_of_job: { // Changed to snake_case
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  experience_level: { // Changed to snake_case
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  job_search_status: { // Changed to snake_case
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  work_authorization: { // Changed to snake_case
    type: DataTypes.JSONB,
    allowNull: false,
  },
  expected_salary: { // Changed to snake_case
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  equity_preference: { // Changed to snake_case
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'applicant_preference', // Changed to applicant_preference
  timestamps: true,
  underscored: true, // Ensures snake_case for timestamps (created_at, updated_at)
});

// Define relationships
applicant.hasOne(applicantPreference, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});
applicantPreference.belongsTo(applicant, {
  foreignKey: 'applicant_id',
});

export { applicantPreference };
