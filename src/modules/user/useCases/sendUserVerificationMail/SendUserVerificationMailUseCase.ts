import { sign } from "jsonwebtoken";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { UserError } from "@modules/user/errors/UserError";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";

import { SendUserVerificationMailErro } from "./SendUserVerificationMailErro";

interface IVariables {
  user_name: string;
  activate_account_url: string;
}

@injectable()
export class SendUserVerificationMailUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("MailProvider")
    private readonly mailProvider: IMailProvider
  ) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user == null) {
      throw new UserError.UserNotFound();
    }

    if (user.verified) {
      throw new SendUserVerificationMailErro.UserAccountAlreadyVerified();
    }

    const token_secret = process.env.JWT_VERIFY_SECRET as string;

    const verification_key = sign({}, token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_VERIFY_EXPIRES_IN,
    });

    await this.usersRepository.updateVerificationKey(user.id, verification_key);

    const view_path = resolve(
      __dirname,
      "../../views/email/activate_account.html"
    );

    const front_end_url = process.env.FRONTEND_URL ?? "";

    const variables: IVariables = {
      user_name: user.name,
      activate_account_url:
        front_end_url + `/users/verify?t=${verification_key}`,
    };

    try {
      await this.mailProvider.sendMail(
        user.email,
        "Verifique sua conta!",
        view_path,
        variables
      );
    } catch {}
  }
}
