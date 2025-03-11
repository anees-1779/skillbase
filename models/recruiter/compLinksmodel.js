import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";
import { company } from "./companyModel.js";

const companyLink = sequelize.define("company_links", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  comp_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  company_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: company,
      key: "id",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: 'company_links', // Changed table name to snake_case
  timestamps: true,
  underscored: true // Ensures all field names use snake_case
});
company.hasOne(companyLink, { foreignKey: "company_id" });
companyLink.belongsTo(company, { foreignKey: "company_id" });

export { companyLink };
