import { Router } from "express";

import { ensureRecaptchaIsValid } from "@middlewares/ensureRecaptchaIsValid";
import { CreateUserSessionController } from "@modules/user/useCases/createSession/CreateUserSessionController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { GetUserProfileByIdController } from "@modules/user/useCases/getUserProfileById/GetUserProfileByIdController";
import { GetUserProfileByTokenController } from "@modules/user/useCases/getUserProfileByToken/GetUserProfileByTokenController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

// POST
const create_user = new CreateUserController();
usersRoutes.post("/", ensureRecaptchaIsValid, create_user.handle);

const create_session = new CreateUserSessionController();
usersRoutes.post("/sessions", ensureRecaptchaIsValid, create_session.handle);

// GET
const get_user_by_id = new GetUserProfileByIdController();
usersRoutes.get("/:user_id", get_user_by_id.handle);

const get_user_by_token = new GetUserProfileByTokenController();
usersRoutes.get("/", ensureAuthenticated, get_user_by_token.handle);

export { usersRoutes };
