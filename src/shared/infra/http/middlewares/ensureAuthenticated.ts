import { Request, Response, NextFunction } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { container } from "tsyringe";

import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  req: Request,
  res: Response,
  nxt: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (authHeader == null || authHeader === "") {
    throw new AppError("Token não informado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_TOKEN_SECRET as string
    ) as IPayload;

    const usersRepository: IUsersRepository =
      container.resolve("UsersRepository");

    const user = await usersRepository.findById(user_id);

    console.log(user);

    nxt();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError("Token expirado!", 401);
    }

    throw new AppError("Token inválido!", 401);
  }
}

export { ensureAuthenticated };
