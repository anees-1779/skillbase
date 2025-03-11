import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import { applicant } from './applicantModel.js';

const applicantEducation = sequelize.define('applicant_education', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  school: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  degree: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  field_of_study: { // Fixed typo and converted to snake_case
    type: DataTypes.STRING,
    allowNull: false,
  },
  gpa: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  start_year: { // Converted to snake_case
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  end_year: { // Converted to snake_case
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'applicant_education',
  timestamps: true,
  underscored: true, // Converts timestamps to snake_case (created_at, updated_at)
});

// Define relationships
applicant.hasOne(applicantEducation, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});
applicantEducation.belongsTo(applicant, {
  foreignKey: 'applicant_id',
});

export { applicantEducation };
