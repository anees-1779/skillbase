import fs from 'fs';

import { verifyToken } from "../../lib/jwtVerification.js";
import { empEducation } from "../../models/applicants/empEducation.js";
import { empExperience } from "../../models/applicants/empExperienceModel.js";
import { Employee } from "../../models/applicants/employeesModel.js";
import { employeesOverview } from "../../models/applicants/employeesOverviewModel.js";
import { empPreference } from "../../models/applicants/empPreferenceModel.js";
import { JobApplication } from '../../models/applicants/jobApplication.js';
import { Company } from '../../models/recruiter/companyModel.js';
import { Job } from '../../models/recruiter/jobModel.js';

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

//TO ADD IMAGES
const addImg = async (ctx) =>{
  const file = ctx.req.file;
  const id = verifyToken(ctx);
  if(!id)
  {
    ctx.status = 403;
    ctx.body = {
      message: "Login session expired"
    }
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete the image' };
        return;
      }
    });
    return;
  }
  if(!file)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please upload image"
    }
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete the image' };
        return;
      }
    });
    
    return;
  }
  const emp = await Employee.findOne({where: {id}});
  if(emp.image)
  {
    console.log(" fileInfo", {
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
      size: file.size,
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete the image' };
        return;
      }
    });
    ctx.status = 400;
    ctx.body = {
      message: "You cannot upload more than one image"
    }
    return
  }
  await Employee.update({ image: file.path},{where: {id} })
   ctx.status = 202;
   ctx.body = {
     message: 'File uploaded successfully',
     fileInfo: {
       originalname: file.originalname,
       mimetype: file.mimetype,
       path: file.path,
       size: file.size,
     },
   };
}

//TO DELETE IMAGE 
const dltImg = async (ctx) => {
  const { filePath } = ctx.request.body; 
  const id = verifyToken(ctx);
  if (!id) {
    ctx.status = 403;
    ctx.body = {
      message: "Login session expired",
    };
    return;
  }
  const emp = await Employee.findOne({where:{id}})

  if (!filePath) {
    ctx.status = 400;
    ctx.body = { error: 'File path is required' };
    return;
  }
  // Validate the filePath input
  if (!emp.image) {
    ctx.status = 404;
    ctx.body = { error: 'No image found' };
    return;
  }

  // Update the employee record to set image to null
  await Employee.update({ image: null }, { where: { id } });

  // Use fs.unlink to delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err); // Log the error for debugging
      ctx.status = 500;
      ctx.body = { error: 'Failed to delete the image' };
      return;
    }
  });
  ctx.status =200
  ctx.body = { message: 'Image deleted successfully' };
};

//TO UPDATE IMAGE
const updateImg = async (ctx) => {
  const file = ctx.req.file;
  const id = verifyToken(ctx);
  if (!id) {
    ctx.status = 403;
    ctx.body = {
      message: "Login session expired",
    };
    return;
  }
  const emp = await Employee.findOne({where:{id}})
  const filePath = emp.image
  console.log(filePath)
  if (!filePath) {
    ctx.status = 404;
    ctx.body = { error: 'No image found' };
    return;
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err); // Log the error for debugging
      ctx.status = 500;
      ctx.body = { error: 'Failed to delete the image' };
      return;
    }
  });
  console.log(file.path)
  await Employee.update({image: file.path}, {where:{id}});
  ctx.status =200
  ctx.body = {
    message: "Image updated Successfully",
    fileInfo: {
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.path,
      size: file.size,
    },
  }
};

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
  const { skills, title, empType, compName, country, status, description , startDate, endDate } = ctx.request.body;
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
    if(!empType || !country || !status || !description || !startDate || !compName || !endDate || !title || !skills)
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empExperience.create({empType, compName, country, status, description , startDate, endDate , employeeId: id, skills, title})
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
  const { skills, title, empType, compName, country, status, description , startDate, endDate } = ctx.request.body;
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
    if(!empType || !country || !status || !description || !startDate || !compName || !endDate || !title || !skills)
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await empExperience.update({empType, compName, country, status, description , startDate, endDate, title, skills},{ where: {employeeId: id}})
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

//TO APPLY JOBS
const applyJob = async (ctx) => {
  const  cv  = ctx.req.file;  
  const { jid } = ctx.params;
  const id = verifyToken(ctx);
  // Check if user is authenticated
  if (!id) {
    ctx.status = 400;
    ctx.body = {
      message: "Login session expired"
    };
    fs.unlink(cv.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete the image' };
        return;
      }
    });
    return;
  }
  if (!cv) {
    ctx.status = 400;
    ctx.body = {
      message: "All details are required"
    };
    return;
  }
  const job = await Job.findOne({where: {id:jid}})
  const employee = await Employee.findOne({where: {id}});
  const checkStatus = await JobApplication.findOne({where:{jobId: jid, userId: id}});
  console.log(job)
  if(checkStatus)
  {
    ctx.status = 400;
    ctx.body = {
      message: "You already applied to this job"
    }
    console.log("You already applied for this jobs")
    fs.unlink(cv.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err); // Log the error for debugging
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete file' };
        return;
      }
    });
    return;
  }
  try {
    const jobApply = await JobApplication.create({
      name: employee.name,
      contact: employee.contact,
      email: employee.email,  
      CV: cv.path ,
      jobId:jid,
      userId: id,
      companyId: job.companyId
    });
    await Job.increment('applicantCount', {
      by: 1, 
      where: { id: jid }
    });
    ctx.status = 200;
    ctx.body = {
      message: "Job applied successfully",
      jobApply
    };
    console.log(`${employee.name} applied for this job successfully`)
  } catch (error) {
    console.error("Error applying for job:", error);
    ctx.status = 500;
    ctx.body = {
      message: "An error occurred while applying for the job"
    };
  }
};

export {addOverview, addPreference, addEducation, addExperience, updateOverview, updatePreference, updateEducation, updateExperience, getOverview, getEducation, getPreference, getExperience, addImg, dltImg, updateImg, applyJob}