import express from "express";
import { validateBody } from "../utils/validateBody.js";
import { createUserSchema, loginUserSchema } from "../validation/auth.js";
import { registerUser, loginUser, refreshSession } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post("/register", validateBody(createUserSchema), ctrlWrapper(registerUser));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUser));

router.post("/refresh", ctrlWrapper(refreshSession));

export default router;