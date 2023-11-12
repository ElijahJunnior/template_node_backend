import { Request, Response } from "express";
import { container } from "tsyringe";

import { RequestErro } from "@shared/errors/RequestErro";

import { SendUserValidationMailUseCase } from "./SendUserValidationMailUseCase";

export class SendUserValidationMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { auth } = req;

    if (auth == null || auth.user == null) {
      throw new RequestErro.InvalidToken();
    }

    const use_case = container.resolve(SendUserValidationMailUseCase);

    await use_case.execute(auth.user.id);

    return res.send();
  }
}
