import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import { Job } from '../recruiter/jobModel.js';
import { Employee } from './EmployeesModel.js';
import { Company } from '../recruiter/companyModel.js';
import { type } from 'os';

const JobApplication = sequelize.define('JobApplication', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  jobId: {  // Foreign key referencing Job table
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Job,
      key: 'id',
    },
  },
  companyId: {  // Foreign key referencing Company table
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Company,
      key: 'id',
    },
  },
  userId: {  // Foreign key referencing Employee (who applied)
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  CV: {
    type: DataTypes.STRING(255), // Store CV file path
  },
  contact: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  status: {  // New field for application status
    type: DataTypes.ENUM('Pending', 'Shortlisted', 'Rejected'),
    defaultValue: 'Pending',
  },
  interviewDate: { // Date for scheduled interviews
    type: DataTypes.DATE,
    allowNull: true,
  },
  interviewLink: { // Link for online interviews
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'JobApplications', // Renamed to match best practices
  timestamps: true,
});

// Define associations
Job.hasMany(JobApplication, { foreignKey: 'jobId', onDelete: 'CASCADE' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId' });

Company.hasMany(JobApplication, { foreignKey: 'companyId', onDelete: 'CASCADE' });
JobApplication.belongsTo(Company, { foreignKey: 'companyId' });

Employee.hasMany(JobApplication, { foreignKey: 'userId', onDelete: 'CASCADE' });
JobApplication.belongsTo(Employee, { foreignKey: 'userId' });

export { JobApplication };
