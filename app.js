import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import { Employee } from "./models/applicants/employeesModel.js";
import { employeesOverview } from "./models/applicants/employeesOverviewModel.js";
import { empPreference } from "./models/applicants/empPreferenceModel.js";
import { empExperience } from "./models/applicants/empExperienceModel.js";
import { empEducation } from "./models/applicants/empEducation.js";
import { Company } from "./models/recruiter/companyModel.js";
import { Job } from "./models/recruiter/jobModel.js";
import { CompanyLink } from "./models/recruiter/compLinksmodel.js";
import { JobApplication } from "./models/applicants/jobApplication.js";
import { authRouter } from "./routes/applicant/authRoute.js";
import koaCors from "@koa/cors";
import { empRouter } from "./routes/applicant/empRoute.js";
import { recruiterAuthRouter } from "./routes/recruiter/recruiterAuthRoute.js";
import { recruiterRouter } from "./routes/recruiter/recruiterRoute.js";
import { jobRouter } from "./routes/recruiter/job/jobRoute.js";
dotenv.config(); // Load environment variables at the top

const app = new Koa();


app.use(koaCors());
app.use(bodyParser());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(empRouter.routes()).use(empRouter.allowedMethods());
app.use(recruiterAuthRouter.routes()).use(recruiterAuthRouter.allowedMethods());
app.use(recruiterRouter.routes()).use(recruiterRouter.allowedMethods());
app.use(jobRouter.routes()).use(jobRouter.allowedMethods());
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
