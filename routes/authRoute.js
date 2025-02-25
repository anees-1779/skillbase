import Router from "koa-router";
import { registerEmployee, message, login } from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post('/register', registerEmployee);

authRouter.post('/login', login);
authRouter.get('/', message)

export { authRouter }