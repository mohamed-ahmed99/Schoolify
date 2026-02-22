import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'


// routes
import authRoutes from './routes/auth.routes.js'
import developmentRoutes from './routes/development.routes.js'
import schoolRoutes from './routes/school.routes.js'

const app = express()

dotenv.config()

// cors
const allowedOrigins = process.env.ORIGINS.split(',') || []
app.use(cors({
    origin: (origin, callBack) => {
        if (!origin || allowedOrigins.includes(origin)) return callBack(null, true)
        else return callBack(new Error("NOT allowed by CORS"))
    },
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())


// connect with DB
const ConnectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.DB_URI)
        console.log("DB done")
        console.log(mongoose.connection.name)
    }
    catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}
ConnectDB()

// 
app.get('/', (req, res) => {
    res.status(200).json({ message: "hello world" })
})


// routes
app.use("/api/auth", authRoutes)
app.use("/api/dev", developmentRoutes)
app.use("/api/schools", schoolRoutes)

// not found routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found.` })
})

// error middleware
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    const response = { status: "error", message, URL:req.originalUrl, data: null }
    console.log(response)
    res.status(statusCode).json(response);
})



const Port = process.env.PORT || 5150
app.listen(Port, () => console.log(`Server running on port ${Port}...`))