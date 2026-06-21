import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate, authorize } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { UsersController } from "../controllers/users.controller";
import { updateUserSchema, userIdParamSchema, userQuerySchema } from "../validators/users.validator";

export const userRoutes = Router();

userRoutes.use(authenticate);
userRoutes.get("/", authorize(Role.ADMIN), validate({ query: userQuerySchema }), UsersController.list);
userRoutes.get("/:id", validate({ params: userIdParamSchema }), UsersController.getById);
userRoutes.patch("/me/profile", validate({ body: updateUserSchema }), UsersController.updateMe);
