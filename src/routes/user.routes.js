import { Router } from "express";
import { singUp } from "../controllers/user.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/signUp", validateSchema(signUpSchema), singUp)

export default userRouter;