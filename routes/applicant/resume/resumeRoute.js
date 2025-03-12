import Router from "koa-router";
import { buildResume } from "../../../controllers/applicant/resume/resumeController.js";

const resumeRouter = new Router();

resumeRouter.post('/build-resume', buildResume);

export { resumeRouter }