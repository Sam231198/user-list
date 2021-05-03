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

    public async story(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        else if (await this.checkNickName(req.body.nickname))
            return res.status(400).json({ errors: "nickname já existe" })

        const newUser = new UserSchema({
            name: req.body.name,
            lastname: req.body.lastname,
            nickname: req.body.nickname,
            address: req.body.address,
            bio: req.body.bio,
        })

        newUser.save(function (err, obj) {
            if (err)
                return res.status(500).json(err)

            return res.status(201).json(obj)
        })
    }

    public async searchNameLastName(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        let dadoSeach: Object

        let name = req.query.name
        let lastname = req.query.lastname

        dadoSeach = (name && lastname)
            ? { name: name, lastname: lastname }
            : (name) ? { name: name } : { lastname: lastname }

        UserSchema.find(dadoSeach).exec((err, doc) => {
            if (!err)
                return res.status(201).json(doc)
            else
                return res.status(500).json(err)
        })

    }

    public async returnUser(req: Request, res: Response) {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        UserSchema.findOne({ nickname: req.params.nickname }).select("nickname name lastname").exec((err, doc) => {
            if (!err)
                return res.status(201).json(doc)
            else
                return res.status(500).json(err)
        })
    }

    public async update(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })


        let update = (req.body.name && req.body.lastname)
            ? { name: req.body.name, lastname: req.body.lastname }
            : (req.body.name) ? { name: req.body.name } : { lastname: req.body.lastname }


        const userUpdate = await UserSchema.findOneAndUpdate({ _id: req.params.id }, update)
            .exec((err, obj) => {
                if (err)
                    return res.status(500).json(err)
            })

        const user = await UserSchema.findOne({ _id: req.params.id }).exec((err, obj) => {
            if (err)
                return res.status(500).json(err)

            return res.status(201).json(obj)
        })

    }

    public async updateNickName(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        else if (await this.checkNickName(req.body.nickname))
            return res.status(400).json({ errors: "nickname já existe" })

        const userUpdate = await UserSchema.findOneAndUpdate(
            { _id: req.params.id },
            { nickname: req.body.nickname }
        ).exec((err, obj) => {
            if (err)
                return res.status(500).json(err)
        })

        const user = await UserSchema.findOne({ _id: req.params.id }).exec((err, obj) => {
            if (err)
                return res.status(500).json(err)

            return res.status(201).json(obj)
        })

    }
    public async deleteUser(req: Request, res: Response): Promise<any> {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })

        UserSchema.deleteOne(
            { _id: req.params.id }, (err) => {
                if (err)
                    return res.status(500).json(err)

                return res.status(201).json()
            }
        )

    }


    private async checkNickName(nickname: string) {
        let result = await UserSchema.findOne().where('nickname').equals(nickname)
        return result == null ? false : true
    }

}

export default new UserController()