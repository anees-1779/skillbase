import Router from "koa-router";
import { addJob } from "../../../controllers/recruiter/job/jobController.js";
import exp from "constants";

const jobRouter = new Router();

jobRouter.post('/job', addJob);


export {jobRouter}