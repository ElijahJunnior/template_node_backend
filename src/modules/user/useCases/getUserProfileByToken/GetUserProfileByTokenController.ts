import { Request, Response } from "express";
import { container } from "tsyringe";

import { RequestErro } from "@shared/errors/RequestErro";

import { GetUserProfileByTokenUseCase as UseCase } from "./GetUserProfileByTokenUseCase";

export class GetUserProfileByTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { auth } = req;

    if (auth == null || auth.user == null) {
      throw new RequestErro.InvalidToken();
    }

    const use_case = container.resolve(UseCase);

    const user = await use_case.execute(auth.user.id);

    return res.json(user);
  }
}
