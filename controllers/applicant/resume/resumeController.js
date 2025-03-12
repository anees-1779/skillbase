import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import * as Yup from 'yup';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define the resume schema for validation
const resumeSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  profile: Yup.string().nullable(), // Optional field
  location: Yup.string().required("Location is required"),
  resumeSummary: Yup.string().required("Resume summary is required"),
  workExperience: Yup.array()
    .of(
      Yup.object({
        company: Yup.string().required("Company name is required"),
        position: Yup.string().required("Position is required"),
        location: Yup.string().required("Location is required"),
        startDate: Yup.string().required("Start date is required"),
        endDate: Yup.string().nullable(),
        responsibilities: Yup.array().of(Yup.string()).required("Responsibilities are required"),
      })
    )
    .required("Work experience is required"),
  education: Yup.array()
    .of(
      Yup.object({
        institution: Yup.string().required("Institution name is required"),
        degree: Yup.string().required("Degree is required"),
        startYear: Yup.number().required("Start year is required"),
        endYear: Yup.number().nullable(), // Nullable for ongoing studies
      })
    )
    .min(1, "At least one education entry is required"),
});

const buildResume = async (ctx) => {
  try {
    // Receive resume data from the Postman request body
    const resumeInfo = ctx.request.body;

    // Validate the resume data using Yup schema
    await resumeSchema.validate(resumeInfo, { abortEarly: false });

    const { fullName, location, email, phoneNumber, resumeSummary, education, workExperience, profile } = resumeInfo;

    // Get the current directory path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Initialize PDF document
    const doc = new PDFDocument();
    const fileName = `${fullName.replace(/\s/g, "_")}.pdf`;
    const filePath = path.join(__dirname, 'uploads/resume', fileName);

    // Ensure the directory exists
    const directoryPath = path.join(__dirname, 'uploads/resume');
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Pipe PDF output to file
    doc.pipe(fs.createWriteStream(filePath));

    // Start PDF content
    doc.font("Helvetica-Bold").fontSize(20).text(fullName, { align: "center" })
      .moveDown(0.5)
      .font("Helvetica").fontSize(12).text(`${location} • ${email} • ${phoneNumber} • ${profile}`, { align: "center" })
      .moveDown(1)
      .strokeColor("#000")
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(1.5);

    // Professional Summary
    doc.font("Helvetica-Bold").fontSize(14).text("Professional Summary")
      .moveDown(0.5).font("Helvetica").fontSize(12).text(resumeSummary).moveDown(1);

    // Education
    doc.font("Helvetica-Bold").fontSize(14).text("Education").moveDown(0.5);
    education.forEach((edu) => {
      doc.font("Helvetica-Bold").text(edu.institution).moveDown(0.2);
      doc.font("Helvetica").text(edu.degree).moveDown(0.2);
      doc.text(`${edu.startYear} - ${edu.endYear || 'Present'}`).moveDown(0.5);
    });

    // Work Experience
    doc.font("Helvetica-Bold").fontSize(14).text("Experience").moveDown(0.5);
    workExperience.forEach((exp) => {
      doc.font("Helvetica-Bold").text(exp.company).moveDown(0.2);
      doc.font("Helvetica").text(exp.position).moveDown(0.2);
      doc.text(`${exp.location} | ${exp.startDate} - ${exp.endDate || 'Present'}`).moveDown(0.2);
      exp.responsibilities.forEach((bullet) => {
        doc.text(`• ${bullet}`, { indent: 20 }).moveDown(0.2);
      });
      doc.moveDown(0.5);
    });

    // Finalize PDF
    doc.end();

    // Send the PDF file as a response
    ctx.set("Content-Disposition", `attachment; filename=${fileName}`);
    ctx.set("Content-Type", "application/pdf");

    // Read the generated file and send it as response
    ctx.body = fs.createReadStream(filePath);

  } catch (error) {
    console.error(error);
    ctx.status = 400;  // Send a 400 status for validation or data-related errors
    ctx.body = { error: "Invalid data provided for resume generation", details: error.errors || error.message };
  }
};

export { buildResume };
