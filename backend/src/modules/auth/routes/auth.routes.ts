import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../../../middlewares/validate.middleware";
import { authenticate } from "../../../middlewares/auth.middleware";
import { authLimiter } from "../../../middlewares/rate-limit.middleware";
import { loginSchema, refreshSchema, registerSchema } from "../validators/auth.validator";

export const authRoutes = Router();

authRoutes.post("/register", authLimiter, validate({ body: registerSchema }), AuthController.register);
authRoutes.post("/login", authLimiter, validate({ body: loginSchema }), AuthController.login);
authRoutes.post("/refresh", authLimiter, validate({ body: refreshSchema }), AuthController.refresh);
authRoutes.post("/logout", authenticate, AuthController.logout);
authRoutes.get("/me", authenticate, AuthController.me);
