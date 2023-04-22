import { Router } from "express";
import { signup } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/users.schema.js";

const usersRouter = Router()

usersRouter.post("/sign-up", validateSchema(userSchema), signup)
usersRouter.post("/sign-in")

export default usersRouter