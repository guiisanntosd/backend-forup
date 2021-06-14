import { Router } from 'express'
import SendMail from './controllers/SendMail'

const routes = Router()

routes.post('/sendMail', SendMail.execute)

export default routes