import { db } from "../database/datababase.connection.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res) {
    const { name, email, password } = req.body

    try {

        const user = await db.collection("users").findOne({ email })
        if (user) {
            return res.status(409).send("E-mail já cadastrado")
        }

        const hash = bcrypt.hashSync(password, 10)

        await db.collection("users").insertOne({ name, email, password: hash })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}   