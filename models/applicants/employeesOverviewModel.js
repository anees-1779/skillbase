import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Employee } from './EmployeesModel.js';

const employeesOverview = sequelize.define('employeesOverview', {
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
  linkedIn: {
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
  tableName: 'EmployeesOverview',
  timestamps: true,
  underscored: true
});

Employee.hasOne(employeesOverview, {
  foreignKey: 'employeeId', 
  onDelete: 'CASCADE', 
});
employeesOverview.belongsTo(Employee, {
  foreignKey: 'employeeId', 
});

export { employeesOverview };
