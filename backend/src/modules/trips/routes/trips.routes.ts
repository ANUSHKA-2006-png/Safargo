import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { TripsController } from "../controllers/trips.controller";
import { createTripSchema, tripIdParamSchema, tripQuerySchema, updateTripSchema } from "../validators/trips.validator";

export const tripRoutes = Router();

tripRoutes.use(authenticate);
tripRoutes.get("/", validate({ query: tripQuerySchema }), TripsController.list);
tripRoutes.post("/", validate({ body: createTripSchema }), TripsController.create);
tripRoutes.get("/:id", validate({ params: tripIdParamSchema }), TripsController.get);
tripRoutes.patch("/:id", validate({ params: tripIdParamSchema, body: updateTripSchema }), TripsController.update);
tripRoutes.delete("/:id", validate({ params: tripIdParamSchema }), TripsController.remove);
