import Router from "koa-router";
import { addJob, deleteJob, rejectApplication, rescheduleInterview, shortListApplication, updateJob, viewApplication, viewJobs } from "../../../controllers/recruiter/job/jobController.js";

const jobRouter = new Router();

jobRouter.post('/job', addJob);
jobRouter.put('/job/:jid', updateJob);
jobRouter.delete('/job/:jid', deleteJob);
jobRouter.get('/job/application', viewApplication);
jobRouter.put('/applicant/:jobApplicantsId/shortlist', shortListApplication);
jobRouter.put('/applicant/:jobApplicantsId/reject', rejectApplication);
jobRouter.get('/job', viewJobs);
jobRouter.put('/applicant/:jobApplicantsId/rescheduleDate', rescheduleInterview)

export {jobRouter}