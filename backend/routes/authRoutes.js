import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  me,
  updateProfile,
  getUser,
} from "../controller/auth.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/signup", upload.single("avatar"), signup);
router.post("/verify-email", verifyEmail);

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isAuthenticated, me);
router.get("/get-user/:id", getUser);

router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("avatar"),
  updateProfile
);
router.post("/forget-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
