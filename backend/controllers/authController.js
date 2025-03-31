import bcryptjs from "bcryptjs";
import generateJwtTokenAndSetCookie from "../utils/generateJwtTokenAndSetCookie.js";
import {
  sendSignUpEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessFull,
} from "../utils/sendEmail.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { Contractor } from "../models/contractor.model.js";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const avatar = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({
      name,
      email,
      role,
      avatar,
      password: hashedPassword,
    });

    await user.save();

    sendSignUpEmail(user.name, user.email);

    generateJwtTokenAndSetCookie(res, user._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: otp,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found (verify token)",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    sendVerificationEmail(user.name, user.email);

    res.status(200).json({
      success: true,
      message: "User is verified",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error (verifying token)",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    await generateJwtTokenAndSetCookie(res, user._id);
    user.lastLogin = Date.now();
    await user.save();

    const response = {
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token found in cookies",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "Test route",
      data: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    sendPasswordResetEmail(
      user.name,
      user.email,
      `${process.env.Client_URL}/reset-passsword/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "reset password link is emailed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Expired token",
      });
    }

    const hashPasword = await bcryptjs.hash(password, 10);

    user.password = hashPasword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    sendPasswordResetSuccessFull(user.name, user.email);
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const avatar = req.file ? `/uploads/${req.file.filename}` : user.avatar;
    user.name = name || user.name;
    user.avatar = avatar;

    await user.save();

    const response = {
      success: true,
      message: "user updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
