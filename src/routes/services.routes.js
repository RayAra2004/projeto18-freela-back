import { Router } from "express";
import { authorizationValidate } from "../middlewares/authorizationValidate.js";
import { getServices, postService } from "../controllers/services.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { serviceSchema } from "../schemas/services.schemas.js";

const servicesRouter = Router();

servicesRouter.post("/services", authorizationValidate, validateSchema(serviceSchema), postService);
servicesRouter.get("/services", getServices);

export default servicesRouter;