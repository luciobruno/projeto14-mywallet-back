import { db } from "../database/datababase.connection.js";
import dayjs from "dayjs";

export async function transactions(req, res) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const user = await db.collection("sessions").findOne({ token })
        const transaction = await db.collection("transactions").find({ idUser:user.idUser }).toArray()
        res.send(transaction)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function newTransaction(req, res) {
    const { value, description } = req.body
    const { type } = req.params
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const user = await db.collection("sessions").findOne({ token })

        await db.collection("transactions").insertOne({ idUser: user.idUser, value, description, type: type, date: dayjs().format("DD-MM") })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }
}