import axios from "axios";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/AppError";

async function ensureRecaptchaIsValid(
  req: Request,
  res: Response,
  nxt: NextFunction
): Promise<void> {
  try {
    const recaptcha_secret_key = process.env.RE_CAPTCHA_SECRET_KEY as string;

    let recaptcha = req.body?.recaptcha_token as string | undefined;

    if (recaptcha == null) {
      const { "recaptcha-token": header_recaptcha } = req.headers;

      if (header_recaptcha != null) {
        recaptcha = header_recaptcha as string;
      } else {
        throw new AppError("A resposta do Google ReCAPTCHA não foi informada.");
      }
    }

    if (process.env.DEV_MODE === "S") {
      return nxt();
    }

    const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptcha_secret_key}&response=${recaptcha}`;

    const { data } = await axios.post(VERIFY_URL);

    if (data == null || data.success !== true) {
      throw new AppError(
        "A resposta do Google ReCAPTCHA é inválido ou está incorreta.",
        400
      );
    }

    nxt();
  } catch (err) {
    throw err;
  }
}

export { ensureRecaptchaIsValid };
