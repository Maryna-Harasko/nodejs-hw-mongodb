import express from "express";
import { validateBody } from "../utils/validateBody.js";
import { createUserSchema } from "../validation/auth.js";
import { registerUser } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();

router.post("/register", validateBody(createUserSchema), ctrlWrapper(registerUser));

export default router;