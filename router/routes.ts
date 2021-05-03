import { Router, Request, Response } from 'express'
import { param, body, validationResult } from 'express-validator'

import UserController from '../app/controller/UserController'
const routes = Router()

routes.get('/', (req: Request, res: Response) => UserController.index(req, res))

routes.post('/',
    [
        body("name").isString().notEmpty()
            .withMessage("o campo 'name' é obrigatório e deve ser uma string"),
        body("lastname").isString().notEmpty()
            .withMessage("o campo 'lastname' é obrigatório e deve ser uma string"),
        body("nickname").isString().isLength({ max: 30 }).notEmpty()
            .withMessage("o campo 'nickname' é obrigatório e deve ser uma string com no máximo 30 caracteres"),
        body("address").isString().notEmpty()
            .withMessage("o campo 'address' é obrigatório e deve ser uma string"),
        body("bio").isString().isLength({ max: 100 })
            .withMessage("o campo 'address' é opcional , mas deve ser uma string com no máximo 100 caracteres"),
    ],
    (req: Request, res: Response) => {
        UserController.story(req, res)
    })

// /searchUsers?name={Value}&lastname={Value}
routes.get("/searchUsers",
    [
        param("name").isString().optional(),
        param("lastname").isString().optional()
    ],
    (req: Request, res: Response) => UserController.searchNameLastName(req, res))

routes.get("/user/:nickname",
    [
        param("nickname").isString().notEmpty()
    ],
    (req: Request, res: Response) => UserController.returnUser(req, res))

routes.put("/:id",
    [
        param("id").isString().notEmpty(),
        body("name").isString().optional(),
        body("lastname").isString().optional(),
    ],
    (req: Request, res: Response) => UserController.update(req, res))

routes.put("/updateNickName/:id",
    [
        param("id").isString().notEmpty(),
        body("nickname").isString().notEmpty()
    ],
    (req: Request, res: Response) => UserController.updateNickName(req, res))

routes.delete("/delete/:id", [param("id").isString().notEmpty()],
    (req: Request, res: Response) => UserController.deleteUser(req, res))

export default routes