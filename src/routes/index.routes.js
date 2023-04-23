import { Router } from "express"
import usersRouter from "./users.routes.js"
import transactionsRouter from "./transaction.routes.js"

const router = Router()
router.use(usersRouter)
router.use(transactionsRouter)

export default router