import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';

// Define the Employee model
const Employee = sequelize.define('Employee', {
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
  image:{
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'Employee',
  timestamps: true,
});

export { Employee };
