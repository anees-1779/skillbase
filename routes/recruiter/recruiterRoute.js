import Router from "koa-router";
import { addDetails } from "../../controllers/recruiter/recruiterController.js";

const recruiterRouter = new Router();

recruiterRouter.post('/details', addDetails);

export {recruiterRouter}