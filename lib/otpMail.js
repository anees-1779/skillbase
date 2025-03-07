import * as nodemailer from 'nodemailer';

const selectApplicantMail = (email, status, interviewDate, interviewLink, company) =>
{const transporter = nodemailer.createTransport({
  host: process.env.MT_host,
  port: process.env.MT_port,
  auth: {
    user: process.env.MT_user,
    pass: process.env.MT_pass
  }
 });  
   transporter.sendMail({
  from:` ${company}<no-reply@${company}.com>`,
  to: email,
  subject:`Your resume has been ${status} for interview at ${company}. `,
  text:`Interview Date: ${interviewDate},
  Interview Link: ${interviewLink}`
});
};

const rejectApplicantMail = (email, status, company) =>
  {const transporter = nodemailer.createTransport({
    host: process.env.MT_host,
    port: process.env.MT_port,
    auth: {
      user: process.env.MT_user,
      pass: process.env.MT_pass
    }
   });
  
     transporter.sendMail({
    from:` ${company}<no-reply@${company}.com>`,
    to: email,
    subject:`Your resume has been ${status}. `,
    text:'Thank you for applying.'
  });
  };

export{ rejectApplicantMail, selectApplicantMail };
