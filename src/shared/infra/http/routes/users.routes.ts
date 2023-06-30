import { Router } from "express";

import { ensureRecaptchaIsValid } from "@middlewares/ensureRecaptchaIsValid";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { CreateUserSessionController } from "@modules/user/useCases/createUserSession/CreateUserSessionController";
import { GetUserProfileByIdController } from "@modules/user/useCases/getUserProfileById/GetUserProfileByIdController";
import { GetUserProfileByTokenController } from "@modules/user/useCases/getUserProfileByToken/GetUserProfileByTokenController";
import { UpdateUserController } from "@modules/user/useCases/updateUser/UpdateUserController";
import { UpdateUserPasswordController } from "@modules/user/useCases/updateUserPassword/UpdateUserPasswordController";

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

// PUT
const update_user = new UpdateUserController();
usersRoutes.put(
  "/",
  ensureRecaptchaIsValid,
  ensureAuthenticated,
  update_user.handle
);

// PATCH
const update_user_password = new UpdateUserPasswordController();
usersRoutes.patch(
  "/password",
  ensureRecaptchaIsValid,
  ensureAuthenticated,
  update_user_password.handle
);

export { usersRoutes };
