import Router from "koa-router";

import { message } from "../../../controllers/applicant/auth/authController.js";
import { registerRecuiter, login } from "../../../controllers/recruiter/auth/recruiterAuthController.js";


const recruiterAuthRouter = new Router();

recruiterAuthRouter.post('/recruiter/register', registerRecuiter);
recruiterAuthRouter.post('/recruiter/login', login);
recruiterAuthRouter.get('/', message)

export { recruiterAuthRouter }