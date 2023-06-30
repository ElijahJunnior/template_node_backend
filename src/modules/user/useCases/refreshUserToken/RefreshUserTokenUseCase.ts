import { decode } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { ISessionDTO } from "@modules/user/dtos/ISessionDTO";
import { UserError } from "@modules/user/errors/UserError";
import { ISessionsRepository } from "@modules/user/repositories/ISessionsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

interface IPayload {
  sub: string;
}

@injectable()
export class RefreshUserTokenUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("SessionsRepository")
    private readonly sessionsRepository: ISessionsRepository
  ) {}

  async execute(refresh_token: string): Promise<ISessionDTO> {
    const { sub: user_id } = decode(refresh_token) as IPayload;

    const user = await this.usersRepository.findById(user_id);

    if (user === undefined) {
      throw new UserError.UserEmailAlreadyExists();
    }
    throw new Error("Not implemented");
  }
}
