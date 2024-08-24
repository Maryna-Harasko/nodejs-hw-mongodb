import express from "express";
import { validateBody } from "../utils/validateBody.js";
import { createUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUser, loginUser, refreshTokenSession, logoutUserSession } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.post("/register", validateBody(createUserSchema), ctrlWrapper(registerUser));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUser));

router.post("/refresh", ctrlWrapper(refreshTokenSession));

router.post("/logout", ctrlWrapper(logoutUserSession));

export default router;