import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Company } from './companyModel.js'; // Adjust the path according to your structure

const Job = sequelize.define('Job', {
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
    unique: true,
  },
  benefits: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  companyId: {  // Foreign key for the relation
    type: DataTypes.UUID,
    references: {
      model: Company,
      key: 'id',
    },
  },
}, {
  tableName: 'Job',
  timestamps: true,
  paranoid: true,
});

// Establishing the one-to-many relationship
Company.hasMany(Job, {
  foreignKey: 'companyId', 
  sourceKey: 'id', 
});
Job.belongsTo(Company, {
  foreignKey: 'companyId', 
  targetKey: 'id', 
});

export { Job };
