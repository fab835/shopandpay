import 'dotenv/config'
import cors from 'cors'
import routesV1 from './routes/v1'
import express from 'express'

const app = express()

app.use(cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
}))

app.use(
    express.json({
        type: ['application/json', 'text/plain'],
    })
)
  

app.use(routesV1)

export { app }
