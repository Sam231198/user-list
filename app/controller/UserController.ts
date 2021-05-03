import { Request, Response } from "express";
import UserSchema from "../schema/UserSchema";
import { validationResult } from "express-validator";

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {

        try {
            let result = await UserSchema
                .find().exec(function (error, userSchema) {
                    userSchema.fullName();
                })

            return res.status(201).json(result)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }

    public async story(req: Request, res: Response): Promise<Response> {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }



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
            return res.status(201).json(error)
        }
    }
}

export default new UserController()