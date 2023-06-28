import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { ISessionDTO } from "@modules/user/dtos/ISessionDTO";
import { SessionMap } from "@modules/user/mappers/SessionMap";
import { ISessionsRepository } from "@modules/user/repositories/ISessionsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { CreateUserSessionError } from "./CreateUserSessionError";

interface ICreateSessionProps {
  email: string;
  password: string;
}

@injectable()
export class CreateUserSessionUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("SessionsRepository")
    private readonly sessionsRepository: ISessionsRepository
  ) {}

  async execute({
    email,
    password,
  }: ICreateSessionProps): Promise<ISessionDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (user === undefined) {
      throw new CreateUserSessionError.InvalidAuthenticationData();
    }

    const is_valid_password = await compare(password, user.password);

    if (!is_valid_password) {
      throw new CreateUserSessionError.InvalidAuthenticationData();
    }

    const token_secret = process.env.JWT_TOKEN_SECRET as string;

    const token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    });

    const refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET as string;

    const refresh_token = sign({}, refresh_token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    const sessions_limit = (process.env.ACTIVE_SESSIONS_LIMIT ?? 20) as number;

    const sessions = await this.sessionsRepository.findByUser(user.id);

    if (sessions.length >= sessions_limit) {
      sessions.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));

      const last_session = sessions[sessions.length - 1];

      await this.sessionsRepository.delete(last_session.id);
    }

    await this.sessionsRepository.create({
      user_id: user.id,
      refresh_token,
    });

    const session = SessionMap.toSessionDTO({
      refresh_token,
      token,
      user,
    });

    return session;
  }
}
