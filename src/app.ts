import express from 'express'
import 'express-async-errors'
import path from 'path'
import cors from 'cors'
import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors({ origin: 'https://agenciaforup.com/' }))
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

export { app }