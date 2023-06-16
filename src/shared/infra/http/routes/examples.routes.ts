import { Router } from "express";

import { CreateExampleController } from "@modules/example/useCases/createExample/CreateExampleController";

// elias_fazer
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
// import { ensureIsAdmin } from "../middlewares/ensureHavePermission";
// import { ensureRecaptchaIsValid } from "../middlewares/ensureRecaptchaIsValid";

const examplesRoutes = Router();

// POST

const createExample = new CreateExampleController();
examplesRoutes.post(
  "/",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  createExample.handle
);

export { examplesRoutes };
