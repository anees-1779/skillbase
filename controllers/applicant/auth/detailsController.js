import fs from 'fs';
import { verifyToken } from "../../../lib/jwtVerification.js";
import { applicantOverview } from '../../../models/applicants/details/applicantOverviewModel.js';
import { applicant } from '../../../models/applicants/details/applicantModel.js';
import { applicantPreference } from '../../../models/applicants/details/applicantPreferenceModel.js';
import { applicantExperience } from '../../../models/applicants/details/applicantExperienceModel.js';
import { applicantEducation } from '../../../models/applicants/details/applicantEducation.js';


//TO ADD OVERVIEW
const addOverview = async (ctx) =>{
  const { country, description, bio, visibility, github , twitter, linkedin} = ctx.request.body;
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
  const checkOverview = await applicantOverview.findOne({where: {applicant_id: id}});
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
  await applicantOverview.create({country, description, bio, visibility, employee_id: id, github, linkedin, twitter, applicant_id: id})
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
  const emp = await applicant.findOne({where: {id}});
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
  await applicant.update({ image: file.path},{where: {id} })
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
  const emp = await applicant.findOne({where:{id}})

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
  await applicant.update({ image: null }, { where: { id } });

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
  const emp = await applicant.findOne({where:{id}})
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
  await applicant.update({image: file.path}, {where:{id}});
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
  const { type_of_job, role, skills, experience_level, job_search_status , work_authorization, expected_salary, equity_preference } = ctx.request.body;
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
    const checkPref = await applicantPreference.findOne({where: {applicant_id: id}});
    if(checkPref)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add one preference'
      }
      console.log("You can Only add One preference");
      return;
    }
    if(!type_of_job || !skills || !experience_level || !job_search_status || !work_authorization || !expected_salary || !equity_preference )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantPreference.create({type_of_job, role, skills, experience_level, job_search_status , work_authorization, expected_salary, equity_preference, applicant_id: id})
  console.log("Overview Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview added successfully"
  }
}

//TO ADD EDUCATION
const addEducation = async (ctx) =>{
  const { description, school, degree, field_of_study, gpa , start_year, end_year } = ctx.request.body;
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
    const checkEdu= await applicantEducation.findOne({where: {applicant_id: id}});
    if(checkEdu)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add education once'
      }
      console.log("You can Only add eduucation once");
      return;
    }
    if(!description || !school || !degree || !field_of_study || !gpa || !start_year || !end_year )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantEducation.create({description, school, degree, field_of_study, gpa , start_year, end_year , applicant_id: id})
  console.log("Education Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Education added successfully"
  }
}

//TO ADD EXPERIENCE
const addExperience = async (ctx) =>{
  const { skills, title, emp_type, comp_name, country, status, description , start_date, end_date } = ctx.request.body;
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
    const checkExp= await applicantExperience.findOne({where: {applicant_id: id}});
    if(checkExp)
    {
      ctx.status = 400;
      ctx.body = {
        message: 'You can only add experience once'
      }
      console.log("You can Only add experience once");
      return;
    }
    if(!emp_type || !country || !status || !description || !start_date || !comp_name || !end_date || !title || !skills)
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantExperience.create({emp_type, comp_name, country, status, description , start_date, end_date , applicant_id: id, skills, title})
  console.log("Experience Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Experience added successfully"
  }
}

//TO UPDATE OVERVIEW
const updateOverview = async (ctx) =>{
  const { country, description, bio, visibility, github , twitter, linked_in} = ctx.request.body;
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
  const checkOverview = await applicantOverview.findOne({where: {applicant_id: id}});
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
  await applicantOverview.update({country, description, bio, visibility, github, linked_in, twitter}, {where :{applicant_id: id}})
  console.log("overview updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Overview updated successfully"
  }
}

//TO UPDATE PREFERENCE
const updatePreference = async (ctx) =>{
  const { type_of_job, role, skills, experience_level, job_search_status , work_authorization, expected_salary, equity_preference } = ctx.request.body;
  console.log(type_of_job, role, skills, experience_level, job_search_status , work_authorization, expected_salary, equity_preference)
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
    const checkPref = await applicantPreference.findOne({where: {applicant_id: id}});
    if(!checkPref)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'preference not found'
      }
      console.log("preference not found");
      return;
    }
    if(!type_of_job || !skills || !experience_level || !job_search_status || !work_authorization || !expected_salary || !equity_preference )
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantPreference.update({type_of_job, role, skills, experience_level, job_search_status , work_authorization, expected_salary, equity_preference }, {where: {applicant_id: id}})
  console.log("preference updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"preference updated successfully"
  }
}

//TO UPDATE EDUCATION
const updateEducation = async (ctx) =>{
  const { description, school, degree, field_of_study, gpa , start_year, end_year } = ctx.request.body;
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
    const checkExp= await applicantEducation.findOne({where: {applicant_id: id}});
    if(!checkExp)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'education not found'
      }
      console.log("education not found");
      return;
    }
    if(!description || !school || !degree || !field_of_study || !gpa || !start_year || !end_year )
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantEducation.update({description, school, degree, field_of_study, gpa , start_year, end_year}, { where: {applicant_id: id}})
  console.log("Education updated Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Education updated successfully"
  }
}

//TO UPDATE EXPERIENCE
const updateExperience = async (ctx) =>{
  const { skills, title, emp_type, comp_name, country, status, description , start_date, end_date } = ctx.request.body;
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
    const checkExp= await applicantExperience.findOne({where: {applicant_id: id}});
    if(!checkExp)
    {
      ctx.status = 404;
      ctx.body = {
        message: 'experience not found'
      }
      console.log("experience not found");
      return;
    }
    if(!emp_type || !country || !status || !description || !start_date || !comp_name || !end_date || !title || !skills)
      {
        ctx.status = 400;
        ctx.body = {
      message: "Please enter all the details"
    }
    return;
  }
  await applicantExperience.update({emp_type, comp_name, country, status, description , start_date, end_date, title, skills},{ where: {applicant_id: id}})
  console.log("Experience Addded Successfully")
  ctx.status = 200;
  ctx.body = {
    message:"Experience added successfully"
  }
}

//TO GET OVERVIEW
const getOverview = async (ctx) => {
  try {
    const decoded = verifyToken(ctx); 
    const id = decoded;
    console.log(id);

    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "Token not found"
      };
      return;
    }

    const checkOverview = await applicantOverview.findOne({ where: { applicant_id: id } });

    if (!checkOverview) {
      ctx.status = 404;
      ctx.body = {
        message: "Overview Not found"
      };
      console.log("Overview Not found");
      return;
    }

    console.log("Overview sent Successfully");
    ctx.status = 200;
    ctx.body = {
      message: "Overview sent successfully",
      data: checkOverview
    };

  } catch (error) {
    console.error("Error occurred while fetching overview:", error);
    ctx.status = 500;
    ctx.body = {
      message: "Internal Server Error",
      error: error.message
    };
  }
};


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
  const checkPreference = await applicantPreference
  .findOne({where: {applicant_id: id}});
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
  const checkEdu = await applicantEducation
  .findOne({where: {applicant_id: id}});
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
  const checkExperience = await applicantExperience
  .findOne({where: {applicant_id: id}});
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

export {addOverview, addPreference, addEducation, addExperience, updateOverview, updatePreference, updateEducation, updateExperience, getOverview, getEducation, getPreference, getExperience, addImg, dltImg, updateImg }