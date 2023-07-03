import { decode, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { ISessionDTO } from "@modules/user/dtos/ISessionDTO";
import { UserError } from "@modules/user/errors/UserError";
import { SessionMap } from "@modules/user/mappers/SessionMap";
import { ISessionsRepository } from "@modules/user/repositories/ISessionsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

import { RefreshUserTokenErro } from "./RefreshUserTokenErro";

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
      throw new UserError.UserNotFound();
    }

    const session = await this.sessionsRepository.findByUserToken({
      refresh_token,
      user_id,
    });

    if (session == null) {
      throw new RefreshUserTokenErro.InvalidRefreshToken();
    }

    try {
      verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET as string);
    } catch (err) {
      await this.sessionsRepository.delete(session.id);

      if (err instanceof TokenExpiredError) {
        throw new RefreshUserTokenErro.ExpiredRefreshToken();
      }

      throw new RefreshUserTokenErro.InvalidRefreshToken();
    }

    const token_secret = process.env.JWT_TOKEN_SECRET as string;

    const new_token = sign({}, token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    });

    const refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET as string;

    const new_refresh_token = sign({}, refresh_token_secret, {
      subject: user.id,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    await this.sessionsRepository.updateToken(session.id, new_refresh_token);

    const new_session = SessionMap.toSessionDTO({
      refresh_token: new_refresh_token,
      token: new_token,
      user,
    });

    return new_session;
  }
}
