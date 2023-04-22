import { Router } from "express";
import { signup,signin } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema, userSigninSchema } from "../schemas/users.schema.js";

const usersRouter = Router()

usersRouter.post("/sign-up", validateSchema(userSchema), signup)
usersRouter.post("/sign-in", validateSchema(userSigninSchema), signin)

export default usersRouter