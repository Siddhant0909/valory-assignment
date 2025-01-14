import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Valory: Email Verification",
    html: `<p>Dear User,</p>
    <p>Your One-Time Password (OTP) is:</p>
    <h1>${otp}</h1>
    <p>OTP is valid only for 05:00 mins. Do not share this OTP with anyone.
</p>`,
  };

  await transporter.sendMail(mailOptions);
};
