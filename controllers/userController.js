import { verifyToken } from "../lib/jwtVerification.js";
import { empEducation } from "../models/empEducation.js";
import { empExperience } from "../models/empExperienceModel.js";
import { employeesOverview } from "../models/employeesOverviewModel.js";
import { empPreference } from "../models/empPreferenceModel.js";

//TO ADD OVERVIEW
const addOverview = async (ctx) =>{
  const { country, description, bio, visibility, github , twitter, linkedIn} = ctx.request.body;
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
  const checkOverview = await employeesOverview.findOne({where: {employeeId: id}});
  if(checkOverview)
  {
    ctx.status = 400;
    ctx.body = {
      message: "You can only add one overview"
    }
    console.log("You can Only add One overview");
    return;
  }
  if(!country || !description || !bio || !visibility )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await employeesOverview.create({country, description, bio, visibility, employeeId: id, github, linkedIn, twitter})
  console.log("OverView Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview added successfully"
  }
}

//TO ADD PREFERENCE
const addPreference = async (ctx) =>{
  const { typeOfJob, role, skills, experienceLevel, jobSearchStatus , workAuthorization, expectedSalary, equityPreference } = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
    if(!id )
      {
        ctx.status = 400;
        ctx.body = {
          message: "Token not found"
        }
        return;
      }
    const checkPref = await empPreference.findOne({where: {employeeId: id}});
    if(checkPref)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add one preference'
      }
      console.log("You can Only add One preference");
      return;
    }
    if(!typeOfJob || !skills || !experienceLevel || !jobSearchStatus || !workAuthorization || !expectedSalary || !equityPreference )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empPreference.create({typeOfJob, role, skills, experienceLevel, jobSearchStatus , workAuthorization, expectedSalary, equityPreference, employeeId: id})
  console.log("Overview Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview added successfully"
  }
}

//TO ADD EDUCATION
const addEducation = async (ctx) =>{
  const { description, school, degree, feildOfStudy, GPA , startyear, endYear } = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
  if(!id )
    {
      ctx.status = 400;
      ctx.body = {
        message: "Token not found"
      }
      return;
    }
    const checkExp= await empEducation.findOne({where: {employeeId: id}});
    if(checkExp)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add education once'
      }
      console.log("You can Only add eduucation once");
      return;
    }
    if(!description || !school || !degree || !feildOfStudy || !GPA || !startyear || !endYear )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empEducation.create({description, school, degree, feildOfStudy, GPA , startyear, endYear , employeeId: id})
  console.log("Education Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Education added successfully"
  }
}

//TO ADD EXPERIENCE
const addExperience = async (ctx) =>{
  const { empType, compName, country, status, description , startDate, endDate } = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
  if(!id )
    {
      ctx.status = 400;
      ctx.body = {
        message: "Token not found"
      }
      return;
    }
    const checkExp= await empExperience.findOne({where: {employeeId: id}});
    if(checkExp)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add experience once'
      }
      console.log("You can Only add experience once");
      return;
    }
    if(!empType || !country || !status || !description || !startDate || !compName || !endDate )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empExperience.create({empType, compName, country, status, description , startDate, endDate , employeeId: id})
  console.log("Experience Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Experience added successfully"
  }
}

//TO UPDATE OVERVIEW
const updateOverview = async (ctx) =>{
  const { country, description, bio, visibility, github , twitter, linkedIn} = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded
  console.log(id)
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkOverview = await employeesOverview.findOne({where: {employeeId: id}});
  if(!checkOverview)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Overview Not found"
    }
    console.log("Overview Not found");
    return;
  }
  if(!country || !description || !bio || !visibility )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await employeesOverview.update({country, description, bio, visibility, github, linkedIn, twitter}, {where :{employeeId: id}})
  console.log("overview updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview updated successfully"
  }
}

//TO UPDATE PREFERENCE
const updatePreference = async (ctx) =>{
  const { typeOfJob, role, skills, experienceLevel, jobSearchStatus , workAuthorization, expectedSalary, equityPreference } = ctx.request.body;
  console.log(typeOfJob, role, skills, experienceLevel, jobSearchStatus , workAuthorization, expectedSalary, equityPreference)
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
    if(!id )
      {
        ctx.status = 400;
        ctx.body = {
          message: "Token not found"
        }
        return;
      }
    const checkPref = await empPreference.findOne({where: {employeeId: id}});
    if(!checkPref)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'preference not found'
      }
      console.log("preference not found");
      return;
    }
    if(!typeOfJob || !skills || !experienceLevel || !jobSearchStatus || !workAuthorization || !expectedSalary || !equityPreference )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empPreference.update({typeOfJob, role, skills, experienceLevel, jobSearchStatus , workAuthorization, expectedSalary, equityPreference }, {where: {employeeId: id}})
  console.log("preference updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"preference updated successfully"
  }
}

//TO UPDATE EDUCATION
const updateEducation = async (ctx) =>{
  const { description, school, degree, feildOfStudy, GPA , startyear, endYear } = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
  if(!id )
    {
      ctx.status = 400;
      ctx.body = {
        message: "Token not found"
      }
      return;
    }
    const checkExp= await empEducation.findOne({where: {employeeId: id}});
    if(!checkExp)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'education not found'
      }
      console.log("education not found");
      return;
    }
    if(!description || !school || !degree || !feildOfStudy || !GPA || !startyear || !endYear )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empEducation.update({description, school, degree, feildOfStudy, GPA , startyear, endYear}, { where: {employeeId: id}})
  console.log("Education updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Education updated successfully"
  }
}

//TO UPDATE EXPERIENCE
const updateExperience = async (ctx) =>{
  const { empType, compName, country, status, description , startDate, endDate } = ctx.request.body;
  const decoded = verifyToken(ctx);
  const id = decoded;
  console.log(id);
  if(!id )
    {
      ctx.status = 400;
      ctx.body = {
        message: "Token not found"
      }
      return;
    }
    const checkExp= await empExperience.findOne({where: {employeeId: id}});
    if(!checkExp)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'experience not found'
      }
      console.log("experience not found");
      return;
    }
    if(!empType || !country || !status || !description || !startDate || !compName || !endDate )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empExperience.update({empType, compName, country, status, description , startDate, endDate},{ where: {employeeId: id}})
  console.log("Experience Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Experience added successfully"
  }
}

//TO GET OVERVIEW
const getOverview = async (ctx) =>{
  const decoded = verifyToken(ctx);
  const id = decoded
  console.log(id)
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkOverview = await employeesOverview.findOne({where: {employeeId: id}});
  if(!checkOverview)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Overview Not found"
    }
    console.log("Overview Not found");
    return;
  }
  console.log("overview sent Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview sent successfully",
    data: checkOverview
  }
}

//TO GET PREFERENCE
const getPreference = async (ctx) =>{
  const decoded = verifyToken(ctx);
  const id = decoded
  console.log(id)
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkPreference = await empPreference
  .findOne({where: {employeeId: id}});
  if(!checkPreference)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Preference Not found"
    }
    console.log("Preference Not found");
    return;
  }
  console.log("Preference sent Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Preference sent successfully",
    data: checkPreference
  }
}

//TO GET EDUCATION
const getEducation = async (ctx) =>{
  const decoded = verifyToken(ctx);
  const id = decoded
  console.log(id)
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkEdu = await empEducation
  .findOne({where: {employeeId: id}});
  if(!checkEdu)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Educaction Not found"
    }
    console.log("Educaction Not found");
    return;
  }
  console.log("Educaction sent Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Educaction sent successfully",
    data: checkEdu
  }
}

//TO GET EXPERIENCE
const getExperience = async (ctx) =>{
  const decoded = verifyToken(ctx);
  const id = decoded
  console.log(id)
  if(!id)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Token not found"
    }
    return;
  }
  const checkExperience = await empExperience
  .findOne({where: {employeeId: id}});
  if(!checkExperience)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Experience Not found"
    }
    console.log("Experience Not found");
    return;
  }
  console.log("Experience sent Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Experience sent successfully",
    data: checkExperience
  }
}

export {addOverview, addPreference, addEducation, addExperience, updateOverview, updatePreference, updateEducation, updateExperience, getOverview, getEducation, getPreference, getExperience}