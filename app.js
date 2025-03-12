import Koa from "koa";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";

import { authRouter } from "./routes/applicant/auth/authRoute.js";
import koaCors from "@koa/cors";
import { applicantRouter } from "./routes/applicant/details/applicantRoute.js";
import { jobRouter } from "./routes/recruiter/job/jobRoute.js";
import { applicantJobRouter } from "./routes/applicant/job/jobRoute.js";
import { recruiterAuthRouter } from "./routes/recruiter/auth/recruiterAuthRoute.js";
import { recruiterRouter } from "./routes/recruiter/auth/recruiterRoute.js";
import serve from "koa-static";
import { resumeRouter } from "./routes/applicant/resume/resumeRoute.js";
dotenv.config(); // Load environment variables at the top
const app = new Koa();

app.use(serve('./uploads'));
app.use(koaCors());
app.use(bodyParser());
app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(applicantRouter.routes()).use(applicantRouter.allowedMethods());
app.use(recruiterAuthRouter.routes()).use(recruiterAuthRouter.allowedMethods());
app.use(recruiterRouter.routes()).use(recruiterRouter.allowedMethods());
app.use(applicantJobRouter.routes()).use(applicantJobRouter.allowedMethods());
app.use(jobRouter.routes()).use(jobRouter.allowedMethods());
app.use(resumeRouter.routes()).use(resumeRouter.allowedMethods());
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    const PORT = 4000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error syncing Users table:", error);
  }
};

startServer(); // Call the function to start the server

export { app };
