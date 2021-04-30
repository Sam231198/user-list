import { Request, Response } from "express";
import UserSchema from "../schema/UserSchema";
import { Schema } from "mongoose";

class UserController {
    public async index(req: Request, res: Response): Promise<Response>{
        let status: number
        let result: any

        try {
            result = await UserSchema.find()
            status = 201
        } catch (error) {
            result = {error: error}
            console.log(error)
            status = 500
        }
        return res.status(status).json(result)
    }
}

export default new UserController()