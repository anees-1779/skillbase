import { applyJob, filterJobs } from "../../../controllers/applicant/job/jobController.js";
import { uploadPdf } from "../../../lib/multerProfile.js";

import Router from "koa-router";

const empJobRouter = new Router();

empJobRouter.post('/apply-job/:jid',uploadPdf.single('cv'), applyJob);
empJobRouter.get('/jobs', filterJobs)

export { empJobRouter}