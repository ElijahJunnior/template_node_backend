import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendUserVerificationMailUseCase } from "./SendUserVerificationMailUseCase";

export class SendUserVerificationMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const use_case = container.resolve(SendUserVerificationMailUseCase);

    await use_case.execute(id);

    return res.send();
  }
}
