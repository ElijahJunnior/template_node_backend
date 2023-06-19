import { Router } from "express";

import { CreateExampleController } from "@modules/example/useCases/createExample/CreateExampleController";
import { FindAllExamplesController } from "@modules/example/useCases/findAllExamples/FindAllExamplesController";
import { FindExampleByIdController } from "@modules/example/useCases/findExampleById/FindExampleByIdController";

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

// GET
const findAllExamples = new FindAllExamplesController();
examplesRoutes.get("/", findAllExamples.handle);

const findExampleById = new FindExampleByIdController();
examplesRoutes.get("/:id", findExampleById.handle);

export { examplesRoutes };
