const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sinh2412004@gmail.com', 
    pass: 'nlby utol apye utpa', 
  },
});

module.exports = transporter;
