import { Request, Response } from "express";
import { container } from "tsyringe";

import { updateUserBodySchema } from "./UpdateUserSchema";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = updateUserBodySchema.validateSync(req.body, {
      stripUnknown: true,
    });

    const { id: user_id } = req.user;

    const use_case = container.resolve(UpdateUserUseCase);

    const user = await use_case.handle({
      name,
      user_id,
    });

    return res.json(user);
  }
}
