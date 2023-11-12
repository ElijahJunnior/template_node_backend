import { Request, Response } from "express";
import { container } from "tsyringe";

import { RequestErro } from "@shared/errors/RequestErro";

import { updateUserBodySchema } from "./UpdateUserSchema";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = updateUserBodySchema.validateSync(req.body, {
      stripUnknown: true,
    });

    const { auth } = req;

    if (auth == null || auth.user == null) {
      throw new RequestErro.InvalidToken();
    }

    const use_case = container.resolve(UpdateUserUseCase);

    await use_case.handle({
      user_id: auth.user.id,
      name,
    });

    return res.send();
  }
}
