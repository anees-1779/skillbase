import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
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
import { jobRouter } from "./routes/recruiter/job/jobRoute.js";
import { empJobRouter } from "./routes/applicant/job/jobRoute.js";
import { recruiterAuthRouter } from "./routes/recruiter/auth/recruiterAuthRoute.js";
import { recruiterRouter } from "./routes/recruiter/auth/recruiterRoute.js";
import serve from "koa-static";
dotenv.config(); // Load environment variables at the top
const app = new Koa();

app.use(serve('./uploads'));
app.use(koaCors());
app.use(bodyParser());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(empRouter.routes()).use(empRouter.allowedMethods());
app.use(recruiterAuthRouter.routes()).use(recruiterAuthRouter.allowedMethods());
app.use(recruiterRouter.routes()).use(recruiterRouter.allowedMethods());
app.use(empJobRouter.routes()).use(empJobRouter.allowedMethods());
app.use(jobRouter.routes()).use(jobRouter.allowedMethods());
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully")
    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error syncing Users table:", error);
  }
};

startServer(); // Call the function to start the server

export { app };
