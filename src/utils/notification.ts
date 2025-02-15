import * as nodemailer from 'nodemailer';

// import { Resend } from "resend";


// const resend = new Resend("re_cKNfkDWY_i74WD7cfYe2wNskRvucz1bFV");


//   export const emailTransporter =async (mailOptions: any) => {
//     return await resend.emails.send(mailOptions);
//   }


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});



export const emailTransporter = async (mailOptions: object) => {
 
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
 
}

