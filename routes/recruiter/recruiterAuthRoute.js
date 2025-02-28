import Router from "koa-router";

import { registerRecuiter, login, message } from "../../controllers/recruiter/recruiterAuthController.js";

const recruiterAuthRouter = new Router();

recruiterAuthRouter.post('/register/recruiter', registerRecuiter);

recruiterAuthRouter.post('/recruiter/login', login);
recruiterAuthRouter.get('/', message)

export { recruiterAuthRouter }