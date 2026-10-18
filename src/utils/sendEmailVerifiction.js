import crypto from "crypto";
import transport from "../config/transporter.js";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

export const sendEmailVerification = async (user) => {
   
  //! 1. Generate random bytes by using crypto
  const token = crypto.randomBytes(32).toString("hex");

  //! 2. Hash the token for database storage
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  //! 3. Set token expires time in 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  //! 4. save the verification data into database ManogoDB
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      emailVerificationToken: tokenHash,
      emailVerificationExpiresTime: expiresAt,
    },
    { new: true }
  );

  //! Create the verifiction link
  const verificationLink = `http://localhost:3000/api/user/emailverification/${token}`;

  //! Send the email to the register email address
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Verify your email address`,
    text: `Hello ${user.name} Please verify your email address by openning this link ${verificationLink} This link expired in 5 minutes. If you didn't register ignore this email.`,
    html: `<div><h2>Hello ${user.name}</h2>
        <p>Please click the link below to verify your email address</p>
        <a href="${verificationLink}">Verify My Email</a>
        
        <p>This link expires in 5 min</p>
        </div>`,
  });
 
  return updatedUser;
};
