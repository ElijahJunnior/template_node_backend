import { Router } from "express";

import { examplesRoutes } from "./examples.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/examples", examplesRoutes);
router.use("/users", usersRoutes);

export { router };
