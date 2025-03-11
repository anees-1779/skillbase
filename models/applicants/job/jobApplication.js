import { sequelize } from '../../../config/database.js';
import { DataTypes } from 'sequelize';
import { job } from '../../recruiter/jobModel.js';
import { applicant } from '../details/applicantModel.js';
import { company } from '../../recruiter/companyModel.js';

const jobApplication = sequelize.define('job_application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  job_id: {  // Foreign key referencing Job table
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: job,
      key: 'id',
    },
  },
  company_id: {  // Foreign key referencing Company table
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: company,
      key: 'id',
    },
  },
  applicant_id: {  // Foreign key referencing Applicant (who applied)
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: applicant,
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
  cv: {  // Store CV file path
    type: DataTypes.STRING(255),
  },
  contact: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  status: {  // New field for application status
    type: DataTypes.ENUM('Pending', 'Shortlisted', 'Rejected'),
    defaultValue: 'Pending',
  },
  interview_date: { // Date for scheduled interviews
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  interview_link: { // Link for online interviews
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'job_application', // Renamed to match best practices
  timestamps: true,
  underscored: true, // Ensures snake_case for timestamps (created_at, updated_at)
});

// Define associations
job.hasMany(jobApplication, { foreignKey: 'job_id', onDelete: 'CASCADE' });
jobApplication.belongsTo(job, { foreignKey: 'job_id' });

company.hasMany(jobApplication, { foreignKey: 'company_id', onDelete: 'CASCADE' });
jobApplication.belongsTo(company, { foreignKey: 'company_id' });

applicant.hasMany(jobApplication, { foreignKey: 'applicant_id', onDelete: 'CASCADE' });
jobApplication.belongsTo(applicant, { foreignKey: 'applicant_id' });

export { jobApplication };
