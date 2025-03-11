import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import { applicant } from './../details/applicantModel.js';

const applicantOverview = sequelize.define('applicant_overview', {
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
  country: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  visibility: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  linkedin: { // Changed to linked_in
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  twitter: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  github: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'applicant_overview',
  timestamps: true,
  underscored: true, // Converts timestamps to snake_case (created_at, updated_at)
});

// Define relationships
applicant.hasOne(applicantOverview, {
  foreignKey: 'applicant_id',
  onDelete: 'CASCADE',
});
applicantOverview.belongsTo(applicant, {
  foreignKey: 'applicant_id',
});

export { applicantOverview };
