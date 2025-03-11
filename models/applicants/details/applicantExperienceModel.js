import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import { applicant } from './applicantModel.js';

const applicantExperience = sequelize.define('applicant_experience', {
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  emp_type: { // Converted to snake_case
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  comp_name: { // Converted to snake_case
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  start_date: { // Converted to snake_case
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  end_date: { // Converted to snake_case
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'applicant_experience',
  timestamps: true,
  underscored: true, // Converts timestamps to snake_case (created_at, updated_at)
});

// Define relationships
applicant.hasOne(applicantExperience, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});
applicantExperience.belongsTo(applicant, {
  foreignKey: 'applicant_id',
});

export { applicantExperience };
