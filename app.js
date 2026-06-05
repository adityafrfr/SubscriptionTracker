import express from 'express'
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";
import { PORT } from './config/env.js'
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.json())


app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/users`, userRouter)
app.use(`/api/v1/subscriptions`, subscriptionsRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send('Welcome to subscription server api')
})
app.listen(PORT, async () => {
    console.log(`subscription tracker api is live on http://localhost:${PORT}`)
    await connectToDatabase()
})
export default app