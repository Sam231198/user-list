import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import UserController from '../app/controller/UserController'
const routes = Router()

routes.get('/', (req: Request, res: Response) => UserController.index(req, res))
routes.post('/',
    [
        body("name")
            .isString()
            // .isLength({ min: 5 })
            .notEmpty()
            .withMessage("o campo 'name' é obrigatório e deve ser uma string"),
        body("lastname")
            .isString()
            // .isLength({ min: 5 })
            .notEmpty()
            .withMessage("o campo 'lastname' é obrigatório e deve ser uma string"),
        body("nickname")
            .isString()
            .isLength({ max: 30 })
            .notEmpty()
            .withMessage("o campo 'nickname' é obrigatório e deve ser uma string com no máximo 30 caracteres"),
        body("address")
            // .isLength({ min: 5 })
            .isString()
            .notEmpty()
            .withMessage("o campo 'address' é obrigatório e deve ser uma string"),
        body("bio")
            .isString()
            .isLength({ max: 100 })
            .withMessage("o campo 'address' é opcional , mas deve ser uma string com no máximo 100 caracteres"),
    ],
    (req: Request, res: Response) => {
        UserController.story(req, res)
    })

export default routes