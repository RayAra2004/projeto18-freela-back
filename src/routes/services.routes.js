import { Router } from "express";
import { authorizationValidate } from "../middlewares/authorizationValidate.js";
import { myServices, getAllCategory, getService, getServices, postService, activeService } from "../controllers/services.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { activeServiceSchema, serviceSchema } from "../schemas/services.schemas.js";

const servicesRouter = Router();

servicesRouter.post("/services", authorizationValidate, validateSchema(serviceSchema), postService);
servicesRouter.get("/services", getServices);
servicesRouter.get("/services/:id", getService);
servicesRouter.get("/my-services", authorizationValidate, myServices)
servicesRouter.get("/category", getAllCategory);
servicesRouter.put("/services/active", authorizationValidate, validateSchema(activeServiceSchema),  activeService);

export default servicesRouter;