import { applyJob, filterJobs } from "../../../controllers/applicant/job/jobController.js";
import { uploadPdf } from "../../../lib/multerProfile.js";

import Router from "koa-router";

const applicantJobRouter = new Router();

applicantJobRouter.post('/apply-job/:jid',uploadPdf.single('cv'), applyJob);
applicantJobRouter.get('/jobs', filterJobs)

export { applicantJobRouter}