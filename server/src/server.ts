require("dotenv").config()
import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"

import authRouter from "./routes/auth"
import novelRouter from "./routes/novel"
import userRouter from "./routes/user"
import chapterRouter from "./routes/chapter"
import imageRouter from "./routes/image"


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const main = async () => {


    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@netnovel.4shijnr.mongodb.net/?retryWrites=true&w=majority`)
    console.log("MongoDB Connected")

    // Routes
    app.use("/api/auth", authRouter);
    app.use("/api/novels", novelRouter);
    app.use("/api/users", userRouter);
    app.use("/api/chapters", chapterRouter);
    app.use("/api/images", imageRouter);


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })

}

main().catch((error) => console.log(error)) 