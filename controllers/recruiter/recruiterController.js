import { verifyToken } from "../../lib/jwtVerification.js";
import { Company } from "../../models/recruiter/companyModel.js";

const addDetails = async (ctx) =>{
  const { No_of_Emp, description, No_of_Jobs,  techStack, foundedIn , CEO} = ctx.request.body;
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
  if(checkDetails.No_of_Emp)
  {
    ctx.status = 400;
    ctx.body = {
      message: "You can only add detail once"
    }
    console.log("You can Only add detail once");
    return;
  }
  if(!No_of_Emp || !description || !No_of_Jobs || !techStack || !foundedIn || !CEO)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await Company.update({ No_of_Emp, description, No_of_Jobs, techStack, foundedIn, CEO }, {where: {id}})
  console.log("Details Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Details added successfully"
  }
}

const updateDetails = async (ctx) =>{
  const { No_of_Emp, description, No_of_Jobs,  techStack, foundedIn , CEO} = ctx.request.body;
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
  if(!No_of_Emp || !description || !No_of_Jobs || !techStack || !foundedIn || !CEO)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await Company.update({ No_of_Emp, description, No_of_Jobs, techStack, foundedIn, CEO }, {where: {id}})
  console.log("Details updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Details updated successfully"
  }
}

export {addDetails, updateDetails}
