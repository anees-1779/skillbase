import Router from "koa-router";
import { addDetails, updateDetails } from "../../controllers/recruiter/recruiterController.js";

const recruiterRouter = new Router();

recruiterRouter.post('/details', addDetails);
recruiterRouter.put('/details',updateDetails)
export {recruiterRouter}