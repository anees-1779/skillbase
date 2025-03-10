import { Employee } from "../../../models/applicants/EmployeesModel.js";
import { JobApplication } from "../../../models/applicants/jobApplication.js";
import { Job } from "../../../models/recruiter/jobModel.js";
import { verifyToken } from "../../../lib/jwtVerification.js";
import { Op, Sequelize } from "sequelize";

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
  const checkStatus = await JobApplication.findOne({where:{job_id: jid, user_id: id}});
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
      cv: cv.path ,
      job_id:jid,
      user_id: id,
      company_id: job.company_id
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

//TO FILTER JOBS
const filterJobs = async (ctx) => {
  try {
    const id = verifyToken(ctx);
    if (!id) {
      ctx.status = 403;
      ctx.body = { message: "Login session expired" };
      return;
    }

    const { title, location, salary_min, salary_max, type } = ctx.query;
    let whereClause = {};

    if (title) {
      whereClause.title = { [Op.iLike]: `%${title}%` };
    }
    if (location) {
      whereClause.location = { [Op.iLike]: `%${location}%` };
    }
    if (salary_min || salary_max) {
      whereClause.salary = {
        [Op.contains]: [parseInt(salary_min), parseInt(salary_max)], // Uses range containment
      };
    }
    if (type) {
      whereClause.type = type.trim(); // Trim to remove unwanted newline characters
    }

    console.log("Filter Conditions:", whereClause);

    const jobs = await Job.findAll({ where: whereClause });

    console.log("Filtered Jobs:", jobs);

    ctx.status = 200;
    ctx.body = { success: true, data: jobs };
  } catch (error) {
    console.error("Error in filterJobs:", error);
    ctx.status = 500;
    ctx.body = { success: false, message: error.message };
  }
};

export { applyJob, filterJobs }