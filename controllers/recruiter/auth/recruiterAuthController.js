import { checkPassword, hashedPassword } from '../../../lib/hashPassword.js';
import { Company } from '../../../models/recruiter/companyModel.js';
import { CompanyLink } from '../../../models/recruiter/compLinksmodel.js';
import { generateToken } from '../../../lib/jwtVerification.js';



// Check if the email already exists
const checkEmail = async (email) => await Company.findOne({ where: { email } });

//CHECK IF THE CONTACT NUMBER ALREADY EXIST 
const checkContact = async (contact) => await  Company.findOne({ where: { contact: contact } });

const registerRecuiter = async (ctx) => {
  const { password, email, comp_name, contact,url } = ctx.request.body;
  console.log(password, email, comp_name, contact)
  if(!url || !password || !email || !comp_name || !contact)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    console.log("please enter all the details")
    return;
  }
  try {
    // Check if email already exists
    if (await checkEmail(email)) {
      ctx.status = 400;
      ctx.body = { message: "Email already exists" };
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
    const company = await Company.create({ password: Password, email, name: comp_name, contact});
    await CompanyLink.create({
      comp_url: url,
      company_id: company.id, // Ensure foreign key is passed
    });
    
    console.log(`${company.name} created successfully`)
    ctx.status = 201;
    ctx.body = { message: "company created successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal server error", error: error.message };
  }
};

// Login recruiter
const login = async (ctx) => {
  const { password, email } = ctx.request.body;
  console.log(email, password);

  if (!email || !password) {
    ctx.status = 400; // Use 400 instead of 404 for missing input
    ctx.body = { message: "Please enter both email and password" };
    console.log("Login failed: Missing credentials");
    return;
  }

  try {
    const recruiter = await checkEmail(email);

    if (!recruiter) {
      ctx.status = 401;
      ctx.body = { message: "Invalid credentials" };
      console.log("Login failed: Email not found");
      return;
    }

    const isPasswordCorrect = await checkPassword(password, recruiter.password);
    
    if (!isPasswordCorrect) {
      ctx.status = 401;
      ctx.body = { message: "Invalid credentials" };
      console.log("Login failed: Incorrect password");
      return;
    }

    const payload = { id: recruiter.id, email: recruiter.email, name: recruiter.name };
    console.log(payload);

    const token = generateToken(payload);
    console.log(token);

    ctx.status = 200;
    ctx.body = { 
      message: "Login successful",
      token: token,
      name: recruiter.name, 
      email: recruiter.email 
    };

    console.log(`${recruiter.name} logged in successfully`);
  } catch (error) {
    console.error("Login error:", error.message);
    ctx.status = 500;
    ctx.body = { message: "Internal server error", error: error.message };
  }
};


const message = async (ctx) =>{
  ctx.body = {
    message: "Welcome to the skillbase"
  }
}
export { registerRecuiter, login , message }