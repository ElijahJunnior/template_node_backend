import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

async function ensureIsAdmin(
  req: Request,
  res: Response,
  nxt: NextFunction
): Promise<void> {
  // elias_fazer
  return nxt();
}

export { ensureIsAdmin };
