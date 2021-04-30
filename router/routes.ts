import { Router, Request, Response} from 'express'
import Controller from '../app/controller/Controller'
const routes = Router()

routes.get('/', (req: Request, res: Response) => Controller.index(req, res))

export default routes