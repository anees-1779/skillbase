import * as nodemailer from 'nodemailer';

function sendMail(email,newResetedPass,username)
{const transporter = nodemailer.createTransport({
  host: process.env.MT_host,
  port: process.env.MT_port,
  auth: {
    user: process.env.MT_user,
    pass: process.env.MT_pass
  }
 });

   transporter.sendMail({
  from: '"Login App" <no-reply@loginapp.com>',
  to: email,
  subject:`Your New password for username:${username} , use it to Update your password `,
  text:`username:${username},
  passsword: ${newResetedPass}`
});
};

export{ sendMail };
