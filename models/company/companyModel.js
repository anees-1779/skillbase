import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type:DataTypes.STRING(255),
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT
  },
  email:{
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contact:{
    type: DataTypes.BIGINT,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING(255),
    allowNull: true
  },
  No_of_Emp: {
    type: DataTypes.RANGE(DataTypes.INTEGER), // Range of integers
    allowNull: true,
  },
  No_of_Jobs: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  techStack: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  foundedIn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CEO: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'Company',
  timestamps: true,
  paranoid: true, 
});

export { Company };
