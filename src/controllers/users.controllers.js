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

export async function signin(req, res) {
    const { email, password } = req.body

    try {
        const user = await db.collection("users").findOne({ email })
        if (!user) {
            return res.status(404).send("E-mail não cadastrado")
        }
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (!correctPassword) {
            return res.status(401).send("Senha incorreta")
        }

        const token = uuid()
        await db.collection("sessions").insertOne({ token, idUser: user._id })
        res.status(200).send({ name: user.name, token })

    } catch (err) {
        res.status(500).send(err.message)
    }
}