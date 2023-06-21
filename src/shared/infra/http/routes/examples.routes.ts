import { Router } from "express";

import { CreateExampleController } from "@modules/example/useCases/createExample/CreateExampleController";
import { DeleteExampleController } from "@modules/example/useCases/deleteExample/DeleteExampleController";
import { FindAllExamplesController } from "@modules/example/useCases/findAllExamples/FindAllExamplesController";
import { FindExampleByIdController } from "@modules/example/useCases/findExampleById/FindExampleByIdController";
import { UpdateExampleActivationController } from "@modules/example/useCases/updateExampleActivation/UpdateExampleActivationController";

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

// PATCH
const updateExampleActivation = new UpdateExampleActivationController();
examplesRoutes.patch(
  "/:id/activation",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  updateExampleActivation.handle
);

// DELETE
const deleteExample = new DeleteExampleController();
examplesRoutes.delete(
  "/:id",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  deleteExample.handle
);

export { examplesRoutes };
