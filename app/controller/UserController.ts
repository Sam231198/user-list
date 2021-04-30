import { Request, Response } from "express";

class Controller {
    public async index(req: Request, res: Response){
        return res.status(201).json({test: "hello word"})
    }
}

export default new Controller()