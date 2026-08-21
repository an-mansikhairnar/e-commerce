import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: '127.0.0.1', // Example only
  port: 587,
  secure: false,
  service: 'applicationnexus',
  auth: {
    user: 'mansi.k@applicationnexus.com',
    pass: 'mansi1322',
  },
});
