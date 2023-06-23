import { container } from "tsyringe";

import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";
import { IExamplesRepositoryMemory } from "@modules/example/repositories/implementations/IExamplesRepositoryMemory";
import { UsersRepositoryInMemory } from "@modules/user/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

container.registerSingleton<IExamplesRepository>(
  "ExamplesRepository",
  IExamplesRepositoryMemory
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepositoryInMemory
);
