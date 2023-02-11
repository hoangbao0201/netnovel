require("dotenv").config()
import express from 'express'
import mongoose from 'mongoose'


const app = express()
const PORT = 4000

const main = async () => {

    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@netnovel.4shijnr.mongodb.net/?retryWrites=true&w=majority`)
    console.log("MongoDB Connected")

    app.get("/api/users", (_req, res) => {
        try {
            res.json({
                name: "bao"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    })


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

}

main().catch((error) => console.log(error)) 