import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import { Employee } from "./models/EmployeesModel.js";
import { employeesOverview } from "./models/employeesOverviewModel.js";
import { empPreference } from "./models/empPreferenceModel.js";
import { empExperience } from "./models/empExperienceModel.js";
import { empEducation } from "./models/empEducation.js";
import { Company } from "./models/company/companyModel.js";
import { Job } from "./models/company/jobModel.js";
import { authRouter } from "./routes/authRoute.js";
import koaCors from "@koa/cors";
import { empRouter } from "./routes/empRoute.js";
dotenv.config(); // Load environment variables at the top

const app = new Koa();


app.use(koaCors());
app.use(bodyParser());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(empRouter.routes()).use(empRouter.allowedMethods())
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    await sequelize.sync({alter: true}); // Sync models to the database
    console.log("✅ Users table synced successfully");

    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error syncing Users table:", error);
  }
};

startServer(); // Call the function to start the server

export { app };
