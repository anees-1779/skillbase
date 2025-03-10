import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Employee } from './EmployeesModel.js';

const empEducation = sequelize.define('applicant_education ', {
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
  feildOfStudy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GPA: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  startyear: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endYear: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'EmpEducation ',
  timestamps: true,
  underscored: true
});

Employee.hasOne(empEducation , {
  foreignKey: 'employeeId', 
  onDelete: 'CASCADE', 
});
empEducation .belongsTo(Employee, {
  foreignKey: 'employeeId', 
});

export { empEducation  };
