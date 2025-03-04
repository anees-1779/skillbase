import Router from "koa-router";
import { addEducation, addExperience, addImg, addOverview, addPreference, applyJob, dltImg, getEducation, getExperience, getOverview, getPreference, updateEducation, updateExperience, updateImg, updateOverview, updatePreference } from "../../controllers/applicant/userController.js";
import { uploadPdf, uploadPhoto } from "../../lib/multerProfile.js";

const empRouter = new Router();

empRouter.post('/overview', addOverview );
empRouter.put('/overview', updateOverview);
empRouter.get('/overview', getOverview);
empRouter.post('/preference', addPreference);
empRouter.put('/preference', updatePreference);
empRouter.get('/preference', getPreference);
empRouter.post('/experience', addExperience);
empRouter.put('/experience', updateExperience);
empRouter.get('/experience', getExperience)
empRouter.post('/education', addEducation);
empRouter.put('/education', updateEducation);
empRouter.get('/education', getEducation);
empRouter.post('/img',uploadPhoto.single('file'), addImg );
empRouter.delete('/img', dltImg);
empRouter.put('/img',uploadPhoto.single('file'), updateImg)
empRouter.post('/apply-job/:jid',uploadPdf.single('cv'), applyJob)

export { empRouter}