import Router from "koa-router";
import { addJob, deleteJob, shortListApplication, updateJob, viewApplication } from "../../../controllers/recruiter/job/jobController.js";

const jobRouter = new Router();

jobRouter.post('/job', addJob);
jobRouter.put('/job/:jid', updateJob);
jobRouter.delete('/job/:jid', deleteJob);
jobRouter.get('/job/application', viewApplication);
jobRouter.put('/job/:jobApplicantsId/shortlist', shortListApplication);


export {jobRouter}