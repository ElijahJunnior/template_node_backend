import { Request, Response } from "express";
import { container } from "tsyringe";

import { updateUserPasswordSchema } from "./UpdateUserPasswordSchema";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";

export class UpdateUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { new_password, old_password } =
      updateUserPasswordSchema.validateSync(req.body, {
        stripUnknown: true,
      });

    const { id: user_id } = req.user;

    const use_case = container.resolve(UpdateUserPasswordUseCase);

    await use_case.execute({
      new_password,
      old_password,
      user_id,
    });

    return res.send();
  }
}
