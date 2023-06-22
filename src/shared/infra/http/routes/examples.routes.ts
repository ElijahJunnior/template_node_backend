import { Router } from "express";

import { CreateExampleController } from "@modules/example/useCases/createExample/CreateExampleController";
import { DeleteExampleController } from "@modules/example/useCases/deleteExample/DeleteExampleController";
import { FindAllExamplesController } from "@modules/example/useCases/findAllExamples/FindAllExamplesController";
import { FindExampleByIdController } from "@modules/example/useCases/findExampleById/FindExampleByIdController";
import { UpdateExampleController } from "@modules/example/useCases/updateExample/UpdateExampleController";
import { UpdateExampleActivationController } from "@modules/example/useCases/updateExampleActivation/UpdateExampleActivationController";

// elias_fazer
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
// import { ensureIsAdmin } from "../middlewares/ensureHavePermission";
// import { ensureRecaptchaIsValid } from "../middlewares/ensureRecaptchaIsValid";

const examplesRoutes = Router();

// POST
const create_example = new CreateExampleController();
examplesRoutes.post(
  "/",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  create_example.handle
);

// GET
const find_all_examples = new FindAllExamplesController();
examplesRoutes.get("/", find_all_examples.handle);

const find_example_by_id = new FindExampleByIdController();
examplesRoutes.get("/:id", find_example_by_id.handle);

// PATCH
const update_example_activation = new UpdateExampleActivationController();
examplesRoutes.patch(
  "/:id/activation",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  update_example_activation.handle
);

// UPDATE
const update_example = new UpdateExampleController();
examplesRoutes.put(
  "/:id",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  update_example.handle
);

// DELETE
const delete_example = new DeleteExampleController();
examplesRoutes.delete(
  "/:id",
  // ensureAuthenticated,
  // ensureIsAdmin,
  // ensureRecaptchaIsValid,
  delete_example.handle
);

export { examplesRoutes };
