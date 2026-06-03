import express from 'express'
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";

import { PORT } from './config/env.js'

const app = express()
app.use(express.json())
app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/users`, userRouter)
app.use(`/api/v1/subscriptions`, subscriptionsRouter)

app.get('/', (req, res) => {
    res.send('Welcome to subscription server api')
})
app.listen(PORT, () => {
    console.log(`subscription tracker api is live on http://localhost:${PORT}`)
})
export default app