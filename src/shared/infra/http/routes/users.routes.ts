import { Router } from "express";

import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";

const usersRoutes = Router();

// POST
const createUser = new CreateUserController();
usersRoutes.post("/", createUser.handle);

export { usersRoutes };
