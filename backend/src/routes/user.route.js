import express from "express";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  googleAuth,
  verifyOtp,
  selectUserRole,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/verify-otp", verifyOtp);

router.post("/select-role", selectUserRole);

router.get("/google", googleAuth);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
