import { sign } from "jsonwebtoken";

import { User } from "@modules/user/entities/User";

import { SendUserVerificationMailErro } from "./SendUserVerificationMailErro";

export class SendUserVerificationMailUseCase {
  // constructor() {}

  async execute(user: User): Promise<void> {
    if (user.verified) {
      throw new SendUserVerificationMailErro.UserAccountAlreadyVerified();
    }

    const token_secret = process.env.JWT_VERIFY_SECRET as string;

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_VERIFY_EXPIRES_IN,
    });
  }
}
