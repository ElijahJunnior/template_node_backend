import { Router } from "express";

import { ensureRecaptchaIsValid } from "@middlewares/ensureRecaptchaIsValid";
import { CreateUserSessionController } from "@modules/user/useCases/createSession/CreateUserSessionController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";

const usersRoutes = Router();

// POST
const create_user = new CreateUserController();
usersRoutes.post("/", ensureRecaptchaIsValid, create_user.handle);

const create_session = new CreateUserSessionController();
usersRoutes.post("/sessions", ensureRecaptchaIsValid, create_session.handle);

export { usersRoutes };
