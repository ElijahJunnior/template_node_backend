import { Router } from "express";

import { ensureRecaptchaIsValid } from "@middlewares/ensureRecaptchaIsValid";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";

const usersRoutes = Router();

// POST
const createUser = new CreateUserController();
usersRoutes.post("/", ensureRecaptchaIsValid, createUser.handle);

export { usersRoutes };
