import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';

const company = sequelize.define('company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  no_of_emp: {
    type: DataTypes.RANGE(DataTypes.INTEGER), // Range of integers
    allowNull: true,
  },
  no_of_job: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  tech_stack: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  founded_in: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  ceo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'company',
  timestamps: true,
  underscored: true, // Ensures all field names use snake_case
});

export { company };
