import express from "express";
import { validateBody } from "../utils/validateBody.js";
import { createUserSchema, loginUserSchema, requestResetEmailSchema } from "../validation/auth.js";
import { registerUser, loginUser, refreshTokenSession, logoutUserSession, requestResetEmailController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post("/register", validateBody(createUserSchema), ctrlWrapper(registerUser));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUser));

router.post("/refresh", ctrlWrapper(refreshTokenSession));

router.post("/logout", ctrlWrapper(logoutUserSession));

router.post("/send-reset-email", validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

router.post("/reset-password");

export default router;