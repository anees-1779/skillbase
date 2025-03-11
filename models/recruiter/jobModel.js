import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { company } from './companyModel.js'; 
import { type } from 'os';

const job = sequelize.define('job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  salary: {
    type: DataTypes.RANGE(DataTypes.INTEGER), // Range of integers
    allowNull: true,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: false
  },
  benefits: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  applicant_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  company_id: {  // Foreign key for the relation
    type: DataTypes.UUID,
    references: {
      model: company,
      key: 'id',
    },
  },
  location: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'job', // Changed table name to snake_case
  timestamps: true,
  underscored: true // Ensures all field names use snake_case
});

// Establishing the one-to-many relationship
company.hasMany(job, {
  foreignKey: 'company_id', 
  sourceKey: 'id', 
});
job.belongsTo(company, {
  foreignKey: 'company_id', 
  targetKey: 'id', 
});

export { job };
