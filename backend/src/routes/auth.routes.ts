import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getUserController,
} from "../controller/auth.controller";
import TokenChecker from "../middleware/auth.middleware";

const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

router.get("/logout",  logoutController);
router.get("/me", TokenChecker, getUserController);

export default router;