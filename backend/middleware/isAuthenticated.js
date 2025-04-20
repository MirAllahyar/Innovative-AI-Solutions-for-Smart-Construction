import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, You need to login first",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.userId);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
