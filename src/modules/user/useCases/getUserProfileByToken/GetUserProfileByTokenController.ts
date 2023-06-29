import { Request, Response } from "express";

export class GetUserProfileByTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;

    return res.json(user);
  }
}
