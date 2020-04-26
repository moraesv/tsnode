import { Request, Response } from 'express'

export default class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    return res.json('User')
  }
}
