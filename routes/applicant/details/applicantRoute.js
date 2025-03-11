import Router from "koa-router";
import { addEducation, addExperience, addImg, addOverview, addPreference, dltImg, getEducation, getExperience, getOverview, getPreference, updateEducation, updateExperience, updateImg, updateOverview, updatePreference } from "../../../controllers/applicant/auth/detailsController.js";
import { uploadPhoto } from "../../../lib/multerProfile.js";

const applicantRouter = new Router();

applicantRouter.post('/overview', addOverview );
applicantRouter.put('/overview', updateOverview);
applicantRouter.get('/overview', getOverview);
applicantRouter.post('/preference', addPreference);
applicantRouter.put('/preference', updatePreference);
applicantRouter.get('/preference', getPreference);
applicantRouter.post('/experience', addExperience);
applicantRouter.put('/experience', updateExperience);
applicantRouter.get('/experience', getExperience)
applicantRouter.post('/education', addEducation);
applicantRouter.put('/education', updateEducation);
applicantRouter.get('/education', getEducation);
applicantRouter.post('/img',uploadPhoto.single('file'), addImg );
applicantRouter.delete('/img', dltImg);
applicantRouter.put('/img',uploadPhoto.single('file'), updateImg)

export { applicantRouter}