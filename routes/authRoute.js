import Router from "koa-router";
import { registerEmployee, message, login } from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post('/employee/register', registerEmployee);

authRouter.post('/employee/login', login);
authRouter.get('/', message)

export { authRouter }