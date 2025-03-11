import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Correcting the typo in 'JWT_SECRET'
const JWT_SECRECT = process.env.JWT_SECRECT;

console.log('JWt:', process.env.JWT_SECRECT); 

// Establish a connection to the database
const sequelize = new Sequelize(
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  {
    host: process.env.DB_host,
    port: process.env.DB_port,
    dialect: 'postgres',
    logging: false,
  }
);


export { sequelize, JWT_SECRECT };

