import Router from "koa-router";
import { login, registerRecuiter } from "../../../controllers/recruiter/recruiterAuthController.js";
import { message } from "../../../controllers/applicant/authController.js";


const recruiterAuthRouter = new Router();

recruiterAuthRouter.post('/register/recruiter', registerRecuiter);
recruiterAuthRouter.post('/recruiter/login', login);
recruiterAuthRouter.get('/', message)

export { recruiterAuthRouter }