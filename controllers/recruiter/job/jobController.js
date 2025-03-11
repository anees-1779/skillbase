import * as Yup from 'yup';
import { verifyToken } from '../../../lib/jwtVerification.js';
import { rejectApplicantMail, selectApplicantMail } from '../../../lib/otpMail.js';
import { job } from '../../../models/recruiter/jobModel.js';
import { jobApplication } from '../../../models/applicants/job/jobApplication.js';
import { company as CompanyModel } from '../../../models/recruiter/companyModel.js';

// Validation schema using Yup
const jobSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
   salary: Yup.array()
    .of(Yup.number().required('Each salary value must be a number'))
    .min(2, 'Salary must have at least two values')
    .required('Salary is required'),
  type: Yup.string().required('Type is required'),
  benefits: Yup.object().required('Benefits are required'),
  tags: Yup.array().of(Yup.string()).required('Tags are required'),
});

//TO ADD JOB
const addJob = async (ctx) => {
  const jobData = ctx.request.body; 
  const companyId = verifyToken(ctx); 

  try {
    await jobSchema.validate(jobData, { abortEarly: false });

    // Check if the company exists
    const company = await CompanyModel.findByPk(companyId);
    if (!company) {
      ctx.status = 404;
      ctx.body = { message: 'Company not found' };
      return;
    }

    const newJob = await job.create({ ...jobData, company_id: companyId });

    ctx.status = 201;
    ctx.body = {
      message: 'Job created successfully',
      job: newJob,
    };
    console.log("New job created successfully");
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      ctx.status = 400;
      ctx.body = {
        message: 'Validation error',
        errors: error.errors,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: 'Error creating job',
        error: error.message,
      };
      console.error("Error creating job:", error);
    }
  }
};

//TO UPDATE JOB
const updateJob = async (ctx) => {
  const {title, description, salary, type, benefits, tags } = ctx.request.body;
  const { jid } = ctx.params
  const jobData =ctx.request.body;
  const id = verifyToken(ctx)
  console.log(id)
  try {
    // Validate the input data against the schema
    await jobSchema.validate(jobData, { abortEarly: false });

    // Check if the company exists
    const company = await CompanyModel.findByPk(id);
    console.log(company)
    if (!company) {
      ctx.status = 404;
      ctx.body = { message: 'Company not found' };
      return;
    }
    if(!jid)
    {
      ctx.status = 400;
      ctx.body = {
        message: "Please enter the job id"
      }
      return;
    }
    await job.update({title, description, salary, type, benefits, tags,}, {where: { company_id:id , id: jid}});
    ctx.status = 200;
    ctx.body = {
      message: 'Job updated successfully',
    };
    console.log("Job updated successfully")
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      ctx.status = 400;
      ctx.body = {
        message: 'Validation error',
        errors: error.errors,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: 'Error creating job',
        error: error.message,
      };
    }
  }
};

//TO DELETE JOB
const deleteJob = async (ctx) =>{
  const { jid } = ctx.params
  const id = verifyToken(ctx)
  console.log(id)
  try {
    // Check if the company exists
    const company = await CompanyModel.findByPk(id);
    if (!company) {
      ctx.status = 404;
      ctx.body = { message: 'Company not found' };
      return;
    }
    const checkJob = await job.findOne({where: {id:jid}});
    console.log(job)
    if(!checkJob){
      ctx.status = 404;
      ctx.body = {
        message: "Job not found"
      }
      return;
    }
    await job.destroy({where: { company_id:id , id: jid}});
    ctx.status = 200;
    ctx.body = {
      message: 'Job deleted successfully',
    };
    console.log("Job deleted successfully")
  } catch (error) {
      ctx.status = 500;
      ctx.body = {
        message: 'Error creating job',
        error: error.message,
      };
    }
};

//TO VIEW WHO APPLIED JOBS
const viewApplication = async (ctx) => {
  try {
    const id = verifyToken(ctx);
    console.log(id);

    if (!id) {
      ctx.status = 403;
      ctx.body = {
        message: "Login session expired",
      };
      return;
    }

    const applied = await jobApplication.findAll({ where: { company_id: id } });
    console.log(applied);

    const count = await jobApplication.count({ where: { company_id: id } });
    console.log(count);

    // Check if any applications exist
    if (applied.length === 0) {
      ctx.status = 404;
      ctx.body = {
        message: "No one applied for the jobs yet",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Applied Users",
      applied,
      count: count,
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    ctx.status = 500;
    ctx.body = {
      message: "Error fetching applications",
      error: error.message,
    };
  }
};


//TO VIEW ALL THE JOBS POSTED
const viewJobs = async (ctx) =>{
  const id = verifyToken(ctx);
  if(!id)
  {
    ctx.status = 403;
    ctx.body = {
      message: "Login session expired"
    }
    return;
  }
  const jobs = await job.findAll({
    where: { company_id: id }});
  
  if(!jobs)
  {
    ctx.status = 404;
    ctx.body = {
      message: "No Jobs posted yet"
    }
    return;
  }

  ctx.status = 200;
  ctx.body = {
    jobs
  };
  console.log("jobs sent successfully")
}

//TO SHORTLIST APPLICANT
const shortListApplication = async (ctx) =>{
 try{ 
  const id = verifyToken(ctx);
  const { interview_date, interview_link } = ctx.request.body 
  const {jobApplicantsId} = ctx.params;
  console.log(jobApplicantsId)
  const application = await jobApplication.findByPk(jobApplicantsId);
  const company = await CompanyModel.findByPk(application.company_id)

  const checkJob = await job.findOne({where: {id: application.job_id}})
  if(!id){
    ctx.status = 400;
    ctx.body = {
      message: "Login session expired"
    }
    return;
  }
  if(!interview_date)
  {
    ctx.status = 400;
    ctx.body = {
      message: "Please enter the interview date"
    }
  }
  if(!application)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Job application not found"
    }
    return;
  }
  if(!checkJob)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Job not found"
    }
    return
  }
  application.status = "Shortlisted"
  application.interviewDate = interview_date
  application.interviewLink = interview_link
  application.save();
  selectApplicantMail(application.email, application.status, application.interview_date, application.interview_link, company.name )
  console.log(application);
  ctx.status = 200
  ctx.body = {
    message: "Applicant shortlisted successfully"
  }
 }
 catch(error){
  ctx.status = 500;
      ctx.body = {
        message: 'Error creating job',
        error: error.message,
      };
 }
}

//TO RESCHEDULE INTERVIEW
const rescheduleInterview = async (ctx) =>{
  const id = verifyToken(ctx);
  const {jobApplicantsId} = ctx.params
  const { rescheduled_date } = ctx.request.body 
  if(!id)
  {
    ctx.status = 403; 
    ctx.body = {
      message: " Login session expired"
    }
    return;
  }
  if(!rescheduled_date){
    ctx.status = 400;
    ctx.body = {
      message: "Please enter the rescheduled Date"
    }
    console.log("Please enter the rescheduled Date")
    return;
  }
  const applicant = await jobApplication.findOne({where: {id: jobApplicantsId}})
  console.log(applicant)
  if(!applicant)
  {
    ctx.status = 404;
    ctx.body = {
      message: "Application not found"
    }
    console.log("Application not found")
    return;
  }
  if(applicant.status != 'Shortlisted'){
    ctx.status = 400;
    ctx.body = {
      message: "This resume has not been shortlisted"
    }
    console.log("This resume has not been shortlisted")
    return;
  }
  applicant.interview_date = rescheduled_date;
  await applicant.save();
  ctx.status = 200;
  ctx.body = {
    message: "Interview date changed successfully",
    newDate: rescheduled_date
  }
  console.log("Interview date changed successfully")
}

//TO REJECT APPLICATION
const rejectApplication = async (ctx) =>{
  try{ 
   const id = verifyToken(ctx); 
   const {jobApplicantsId} = ctx.params;
   console.log(jobApplicantsId)
   const application = await jobApplication.findByPk(jobApplicantsId);
   const company = await CompanyModel.findByPk(application.company_id)
 
   const checkJob = await job.findOne({where: {id: application.job_id}})
   if(!id){
     ctx.status = 400;
     ctx.body = {
       message: "Login session expired"
     }
     return;
   }
   if(!checkJob)
   {
     ctx.status = 404;
     ctx.body = {
       message: "Job not found"
     }
     return
   }
   if(!application)
    {
      ctx.status = 404;
      ctx.body = {
        message: "Job application not found"
      }
      return;
    }
   application.status = "Rejected"
   await application.save();
   rejectApplicantMail(application.email, application.status, company.name )
   console.log(application);
   ctx.status = 200
   ctx.body = {
     message: "Applicant rejected successfully"
   }
  }
  catch(error){
   ctx.status = 500;
       ctx.body = {
         message: 'Error creating job',
         error: error.message,
       };
  }
 }

export { addJob, updateJob, deleteJob, viewApplication, shortListApplication, rejectApplication, viewJobs, rescheduleInterview};
