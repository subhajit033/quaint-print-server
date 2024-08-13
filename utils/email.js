const { text } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (email, subject, content) => {
  try {
    const message = {
      from: 'kundusubha@gmail',
      to: `${email}`,
      subject: subject,
      text: content,
      // text: 'Hi from your nodemailer project'
    };
    await transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
      }

      console.log('Message sent successfully!');
      console.log(nodemailer.getTestMessageUrl(info));

      // only needed when using pooled connections
      // transporter.close();
    });
  } catch (error) {
    console.log(e);
  }
};

module.exports = {sendMail}
