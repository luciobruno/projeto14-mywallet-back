import { Router } from "express";
import { transactions } from "../controllers/transactions.controllers.js";
import { authorizationValidation } from "../middlewares/authorization.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
import { newTransaction } from "../controllers/transactions.controllers.js";

const transactionsRouter = Router()

transactionsRouter.use(authorizationValidation)

transactionsRouter.post("/new-transaction/:type", validateSchema(transactionSchema), newTransaction)
transactionsRouter.get("/transactions", transactions)

export default transactionsRouter