import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Employee } from './EmployeesModel.js';

const empPreference = sequelize.define('empPreference', {
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
  typeOfJob: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  experienceLevel: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  jobSearchStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  workAuthorization: {
    type: DataTypes.JSONB,
    allowNull: false ,
  },
  expectedSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  equityPreference: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'EmpPreference',
  timestamps: true,

});

Employee.hasOne(empPreference, {
  foreignKey: 'employeeId', 
  onDelete: 'CASCADE', 
});
empPreference.belongsTo(Employee, {
  foreignKey: 'employeeId', 
});

export { empPreference };
