import { Employee } from '../models/EmployeesModel.js';
import { generateToken } from '../lib/jwtVerification.js';
import { checkPassword, hashedPassword } from '../lib/hashPassword.js';

// Check if the user exists by username
const checkUser = async (username) => await Employee.findOne({ where: { username } });

// Check if the email already exists
const checkEmail = async (email) => await Employee.findOne({ where: { email } });

//CHECK IF THE CONTACT NUMBER ALREADY EXIST 
const checkContact = async (contact) => await  Employee.findOne({ where: { contact: contact } });

const registerEmployee = async (ctx) => {
  const { username, password, email, fullName, contact, } = ctx.request.body;
  console.log(username, password, email, fullName, contact)
  if(!username || !password || !email || !fullName || !contact)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    console.log("please enter all the details")
    return;
  }
  try {
    // Check if username or email already exists
    if (await checkUser(username) || await checkEmail(email)) {
      ctx.status = 400;
      ctx.body = { message: "Username or Email already exists" };
      console.log("failed to register")
      return;
    }
    if(await checkContact(contact)){
      ctx.status = 400;
      ctx.body = {
        message: "Number already exist"
      }
      return;
    }
    // Hash password and create the user
    const Password = await hashedPassword(password);
    const employee = await Employee.create({ username, password: Password, email, name: fullName, contact});
    console.log(`${employee.name} created successfully`)
    ctx.status = 201;
    ctx.body = { message: "User created successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal server error", error: error.message };
  }
};

// Login user
const login = async (ctx) => {
  const { password, email } = ctx.request.body;
  console.log(email,password);
  if(!email || !password)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Please enter both username and password"
    }
    console.log('login failed')
    return;
  }
  try {
    const employee = await checkEmail(email);
    if (employee && await checkPassword(password, employee.password)) {
      const payload = { id: employee.id, username: employee.username, email: employee.email, name: employee.name };
      console.log(payload)
      const token =  generateToken(payload);
      console.log(token)
      console.log(employee.name, employee.email)
      ctx.status = 200;
      ctx.body = { message: "Login successful",
                   token:token,
                   name: employee.name, 
                   email: employee.email };
      console.log(` ${employee.name} Logged in successfull`)
      return;
    }

    ctx.status = 401;
    ctx.body = { message: "Invalid credentials" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal server error", error: error.message };
  }
};

const message = async (ctx) =>{
  ctx.body = {
    message: "Welcome to the skillbase"
  }
}
export { registerEmployee, login , message}