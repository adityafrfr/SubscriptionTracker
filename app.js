import express from 'express'

import { PORT } from './config/env.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to subscription server api')
})
app.listen(PORT, () => {
    console.log(`subscription tracker api is live on http://localhost:${PORT}`)
})
export default app