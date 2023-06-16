import { container } from "tsyringe";

import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";
import { IExamplesRepositoryMemory } from "@modules/example/repositories/implementations/IExamplesRepositoryMemory";

container.registerSingleton<IExamplesRepository>(
  "ExamplesRepository",
  IExamplesRepositoryMemory
);
