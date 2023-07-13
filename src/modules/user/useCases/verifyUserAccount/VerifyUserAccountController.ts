import { Request, Response } from "express";
import { container } from "tsyringe";

import { verifyUserAccountSchema } from "./VerifyUserAccountSchema";
import { VerifyUserAccountUseCase } from "./VerifyUserAccountUseCase";

export class VerifyUserAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { activation_key } = verifyUserAccountSchema.validateSync(req.body, {
      stripUnknown: true,
    });

    const use_case = container.resolve(VerifyUserAccountUseCase);

    await use_case.execute(activation_key);

    return res.send();
  }
}
