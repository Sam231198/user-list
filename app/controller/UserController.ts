import { Request, Response } from "express";
import UserSchema from "../schema/UserSchema";
import { validationResult } from "express-validator";

class UserController {

    public async index(req: Request, res: Response): Promise<Response> {

        try {
            return res.status(201).json(await UserSchema.find())
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    public async story(req: Request, res: Response): Promise<Response> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        else if (await this.checkNickName(req.body.nickname))
            return res.status(400).json({ errors: "nickname já existe" })

        try {
            const newUser = new UserSchema({
                name: req.body.name,
                lastname: req.body.lastname,
                nickname: req.body.nickname,
                address: req.body.address,
                bio: req.body.bio,
            })

            return res.status(201).json(newUser.save())
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    public async searchNameLastName(req: Request, res: Response): Promise<Response> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        else if (req.params.name == "" && req.params.lastname == "")
            return res.status(400).json({ errors: "é necessário pelo meno um parametro: name ou last name" })

        let dadoSeach

        dadoSeach =  { lastname: req.params.lastname }

        try {
            UserSchema.find({$or: [{name: req.params.name}, {lastname: req.params.lastname}]}).exec(function(err, doc){
                return res.status(201).json(doc)
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    private async checkNickName(nickname: string) {
        let result = await UserSchema.findOne().where('nickname').equals(nickname)
        return result == null ? false : true
    }
}

export default new UserController()