import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';

// Define the Applicant model
const applicant = sequelize.define('applicant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contact: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  tableName: 'applicant', // Updated table name
  timestamps: true,
  underscored: true // Converts timestamps to snake_case (created_at, updated_at)
});

export { applicant };
