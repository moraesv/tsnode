import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.status(204).send('Hello'))

export default routes
