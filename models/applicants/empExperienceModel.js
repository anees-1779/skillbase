import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Employee } from './EmployeesModel.js';
import { type } from 'os';

const empExperience = sequelize.define('empExperience', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  employeeId: { // Foreign key
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employee, // Reference to Employee model
      key: 'id',
    },
  },
  title:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  skills:{
    type: DataTypes.JSONB,
    allowNull: false
  },
  empType: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  compName: {
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'EmpExperience',
  timestamps: true,
  underscored: true
});

Employee.hasOne(empExperience, {
  foreignKey: 'employeeId', 
  onDelete: 'CASCADE', 
});
empExperience.belongsTo(Employee, {
  foreignKey: 'employeeId', 
});

export { empExperience };
