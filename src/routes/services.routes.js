import { Router } from "express";
import { authorizationValidate } from "../middlewares/authorizationValidate.js";
import { postService } from "../controllers/services.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { serviceSchema } from "../schemas/services.schemas.js";

const servicesRouter = Router();

servicesRouter.post("/services", authorizationValidate, validateSchema(serviceSchema), postService)

export default servicesRouter;