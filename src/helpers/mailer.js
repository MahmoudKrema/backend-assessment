import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../config/index.js';

class Mailer {
  static emailConfig = {
    service: config.email.service,
    auth: {
      user: config.email.email,
      pass: config.email.password,
    },
  };

  constructor() {
    this.transporter = nodemailer.createTransport(Mailer.emailConfig);
  }

  sendVerificationEmail(email, token) {
    const mailOptions = {
      from: Mailer.emailConfig.auth.user,
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: http://localhost:${config.port}/api/users/verify/${token}`,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  sendEmail(email, subject, text) {

    const mailOptions = {
      from: Mailer.emailConfig.auth.user,
      to: email,
      subject: subject,
      text: text,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }

  generateVerificationToken(email) {
    const secret = config.jwtKey;
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    return token;
  }
}
const mailer = new Mailer();

export {Mailer, mailer};