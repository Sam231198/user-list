import { Router, Request, Response} from 'express'
import UserController from '../app/controller/UserController'
const routes = Router()

routes.get('/', (req: Request, res: Response) => UserController.index(req, res))

export default routes