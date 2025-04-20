import generateEmailTemplate from "./emails/generateEmailTemplate.js";
import transporter from "./emails/transporter.js";

export const sendSignUpEmail = async (name, email, token) => {
  const signUpMessage = generateEmailTemplate("signup", {
    name,
    token,
  });

  await transporter({
    email,
    subject: "Signup Successful",
    message: "Welcome to smart-construction", // You can customize this message acccording to your App Name
    html: signUpMessage,
  });
};

export const sendVerificationEmail = async (name, email) => {
  const verificationMessage = generateEmailTemplate("Welcome", {
    name,
    email,
  });

  await transporter({
    email,
    subject: "Welcome",
    message: "Welcome to PassSense", // You can customize this message acccording to your App Name
    html: verificationMessage,
  });
};

export const sendPasswordResetEmail = async (name, email, url) => {
  const resetMessage = generateEmailTemplate("Reset", {
    name,
    email,
    url,
  });

  await transporter({
    email,
    subject: "Reset Password",
    message: "Reset Password Request",
    html: resetMessage,
  });
};

export const sendBiddingEmail = async (
  name,
  email,
  message,
  amount,
  title,
  bidderName,
  bidderEmail
) => {
  const bidMessage = generateEmailTemplate("Bid", {
    name,
    email,
    message,
    amount,
    title,
    bidderName,
    bidderEmail,
  });

  await transporter({
    email,
    subject: "New Bid Request",
    message: "Bid Request",
    html: bidMessage,
  });
};

export const sendPasswordResetSuccessFull = async (name, email) => {
  const successMessage = generateEmailTemplate("Reset Success", {
    name,
    email,
  });

  await transporter({
    email,
    subject: "Reset Successfull",
    message: "Welcome to PassSense", // You can customize this message acccording to your App Name
    html: successMessage,
  });
};
