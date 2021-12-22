import path from "path";
import nodemailer from "nodemailer";
import key from "../config/key";

require("dotenv").config({ path: path.resolve(__dirname, "/../../.env")});

export const sendEmail = async (data) => {
  console.log(data, " the data inside configuration")
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: key.EMAIL_USER,
      pass: key.EMAIL_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: data.sender,
    to: data.receiver,
    subject: data.subject,
    text: 'Hello world',
    html: data.message, // html body
  });

  console.log("Message sent: %s", info.messageId);
}