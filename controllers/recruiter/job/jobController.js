import * as Yup from 'yup';
import { verifyToken } from '../../../lib/jwtVerification.js';
import { Company } from '../../../models/company/companyModel.js';
import { Job } from '../../../models/company/jobModel.js';

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
    const company = await Company.findByPk(companyId);
    if (!company) {
      ctx.status = 404;
      ctx.body = { message: 'Company not found' };
      return;
    }

    const newJob = await Job.create({ ...jobData, companyId });

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
  try {
    // Validate the input data against the schema
    await jobSchema.validate(jobData, { abortEarly: false });

    // Check if the company exists
    const company = await Company.findByPk(id);
    console.log(jobData)
    if (!company) {
      ctx.status = 404;
      ctx.body = { message: 'Company not found' };
      return;
    }
    const updatedJob = await Job.update({title, description, salary, type, benefits, tags,}, {where: { companyId:id , id: jid}});
    ctx.status = 200;
    ctx.body = {
      message: 'Job created successfully',
      data: updatedJob,
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

export { addJob, updateJob };
