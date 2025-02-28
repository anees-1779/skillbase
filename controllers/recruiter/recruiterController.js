import { verifyToken } from "../../lib/jwtVerification.js";
import { Company } from "../../models/company/companyModel.js";

const addDetails = async (ctx) =>{
  const { No_0f_Emp, description, No_of_Jobs,  techStack, foundedIn , CEO} = ctx.request.body;
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
  const checkOverview = await Company.findOne({where: { id}});
  if(checkOverview.No_0f_Emp)
  {
    ctx.status = 400;
    ctx.body = {
      message: "You can only add detail once"
    }
    console.log("You can Only add detail once");
    return;
  }
  if(!No_0f_Emp || !description || !No_of_Jobs || !techStack || !foundedIn || !CEO)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await Company.update({ No_0f_Emp, description, No_of_Jobs, techStack, foundedIn, CEO }, {where: {id}})
  console.log("Details Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Details added successfully"
  }
}

export {addDetails}
