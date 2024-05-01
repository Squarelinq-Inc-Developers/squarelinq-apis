import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();


//onboarding
router.post("/sign-up", authController.signUp_post);
router.post("/sign-in", authController.signIn_post);




export default router;