import Router from "koa-router";
import { addEducation, addExperience, addOverview, addPreference, getEducation, getExperience, getOverview, getPreference, updateEducation, updateExperience, updateOverview, updatePreference } from "../controllers/userController.js";

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

export { empRouter}