import { inject } from "tsyringe";

import { ISessionsRepository } from "@modules/user/repositories/ISessionsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { CreateUserSessionError } from "./CreateUserSessionError";

interface ICreateSessionProps {
  email: string;
  password: string;
}

export class CreateUserSessionUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("SessionsRepository")
    private readonly sessionsRepository: ISessionsRepository
  ) {}

  async execute({ email, password }: ICreateSessionProps) {
    const user = await this.usersRepository.findByEmail(email);

    if (user === undefined) {
      return new CreateUserSessionError.InvalidAuthenticationData();
    }
  }
}
