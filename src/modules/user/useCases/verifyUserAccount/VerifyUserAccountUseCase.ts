import { decode, TokenExpiredError, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { UserError } from "@modules/user/errors/UserError";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { VerifyUserAccountErro } from "./VerifyUserAccountErro";

interface IPayload {
  sub: string;
}

@injectable()
export class VerifyUserAccountUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(activation_key: string): Promise<void> {
    const { sub: user_id } = decode(activation_key) as IPayload;

    const user = await this.usersRepository.findById(user_id);

    if (user === undefined) {
      throw new UserError.UserNotFound();
    }

    if (user.verification_key !== activation_key) {
      throw new VerifyUserAccountErro.InvalidActivationKey();
    }

    try {
      verify(activation_key, process.env.JWT_VERIFY_SECRET as string);
    } catch (err) {
      await this.usersRepository.updateVerificationKey(user.id, "");

      if (err instanceof TokenExpiredError) {
        throw new VerifyUserAccountErro.ExpiredActivationKey();
      }

      throw new VerifyUserAccountErro.InvalidActivationKey();
    }

    await this.usersRepository.setVerifiedAndClearVerificationKey(user_id);
  }
}
