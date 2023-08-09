import { Router } from "express";
import { signIn, singUp } from "../controllers/user.controllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { loginSchema, signUpSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post("/signUp", validateSchema(signUpSchema), singUp)
userRouter.post("/signIn", validateSchema(loginSchema), signIn)

export default userRouter;