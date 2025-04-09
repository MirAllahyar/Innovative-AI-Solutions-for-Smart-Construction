import express from "express";
import {
  getAllContractors,
  updateContractorProfile,
  getContractor,
  getContractorById,
  rateContractor,
} from "../controller/contractor.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();

router.get("/getAllContractors", getAllContractors);

router.patch(
  "/update-contractor-profile",
  isAuthenticated,
  updateContractorProfile
);
router.post("/rate/:id", isAuthenticated, rateContractor);

router.get("/get-contractor", isAuthenticated, getContractor);
router.get("/get-contractor/:id", getContractorById);

export default router;
