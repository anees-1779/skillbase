import jwt from "jsonwebtoken";
import { JWT_SECRECT } from "../config/database.js";

const verifyToken = (ctx) =>{
try{  const token = ctx.headers.authorization?.split(' ')[1];
  const decoded =  jwt.verify(token, JWT_SECRECT);
  const id = decoded.id;
  console.log(id)
  return id
}catch (error) {
  console.log(error)
  if (error.name === "TokenExpiredError") {
   return null
  }
}
}

const generateToken = (payload) =>{
  const token = jwt.sign(payload , JWT_SECRECT,{expiresIn:'1h'});
  return token;
}

export { verifyToken, generateToken };