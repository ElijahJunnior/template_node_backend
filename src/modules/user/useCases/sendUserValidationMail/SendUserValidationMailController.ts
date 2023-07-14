import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendUserValidationMailUseCase } from "./SendUserValidationMailUseCase";

export class SendUserValidationMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const use_case = container.resolve(SendUserValidationMailUseCase);

    await use_case.execute(id);

    return res.send();
  }
}
