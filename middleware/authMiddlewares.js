import Koa from 'koa';
import koaJwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import { JWT_SECRECT }from '../config/database.js'; // Ensure correct variable name

const app = new Koa();

app.use(bodyParser()); // Parse incoming request bodies

// JWT Middleware
const auth = koaJwt({ secret: JWT_SECRECT }).unless({
  path: ['/public', '/login', '/register'], // Paths that don't require authentication
});

// Error handling middleware for JWT
app.use(async (ctx, next) => {
  try {
    await next(); // Pass to the next middleware
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized: Invalid or missing token' };
      return;
    } else {
      throw err; // Re-throw other errors
    }
  }
});

app.use(auth); // Use JWT middleware

