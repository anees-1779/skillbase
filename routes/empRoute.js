import Router from "koa-router";
import { addEducation, addExperience, addImg, addOverview, addPreference, dltImg, getEducation, getExperience, getOverview, getPreference, updateEducation, updateExperience, updateImg, updateOverview, updatePreference } from "../controllers/userController.js";
import { upload } from "../lib/multerProfile.js";

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
empRouter.post('/img',upload.single('file'), addImg );
empRouter.delete('/img', dltImg);
empRouter.put('/img',upload.single('file'), updateImg)

export { empRouter}