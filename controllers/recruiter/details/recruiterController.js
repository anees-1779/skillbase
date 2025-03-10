import { verifyToken } from "../../../lib/jwtVerification.js";
import { Company } from "../../../models/recruiter/companyModel.js";

const addDetails = async (ctx) =>{
  const { no_of_emp, description, no_of_job,  tech_stack, founded_in , ceo} = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkDetails = await Company.findOne({where: { id}});
  if(checkDetails.no_of_emp)
  {
    ctx.status = 400;
    ctx.body = {
      message: "You can only add detail once"
    }
    console.log("You can Only add detail once");
    return;
  }
  if(!no_of_emp || !description || !no_of_job || !tech_stack || !founded_in || !ceo)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await Company.update({ no_of_emp, description, no_of_job, tech_stack, founded_in, ceo }, {where: {id}})
  console.log("Details Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Details added successfully"
  }
}

const updateDetails = async (ctx) =>{
  const { no_of_emp, description, no_of_job,  tech_stack, founded_in , ceo} = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkDetails = await Company.findOne({where: { id}});
  if(!checkDetails)
  {
    ctx.status = 400;
    ctx.body = {
      message: "No details found"
    }
    console.log("No details found");
    return;
  }
  if(!no_of_emp || !description || !no_of_job || !tech_stack || !founded_in || !ceo)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await Company.update({ no_of_emp, description, no_of_job, tech_stack, founded_in, ceo }, {where: {id}})
  console.log("Details updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Details updated successfully"
  }
}

export {addDetails, updateDetails}
