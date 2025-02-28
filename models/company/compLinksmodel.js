import { DataTypes } from "sequelize";
import {sequelize} from "../../config/database.js";
import{ Company} from "./companyModel.js";

const CompanyLink = sequelize.define("CompanyLink", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  compURL: {
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
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Company,
      key: "id",
    },
    onDelete: "CASCADE",
  },
}, {
  timestamps: true,
});

Company.hasOne(CompanyLink, { foreignKey: "companyId" });
CompanyLink.belongsTo(Company, { foreignKey: "companyId" });

export {CompanyLink};
