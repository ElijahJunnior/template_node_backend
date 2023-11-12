import { Request, Response } from "express";
import { container } from "tsyringe";

import { RequestErro } from "@shared/errors/RequestErro";

import { FindUserSessionsUseCase as UseCase } from "./FindUserSessionsUseCase";

export class FindUserSessionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { auth } = req;

    if (auth == null || auth.user == null) {
      throw new RequestErro.InvalidToken();
    }

    const use_case = container.resolve(UseCase);

    const sessions = await use_case.execute(auth.user.id);

    return res.json(sessions);
  }
}
