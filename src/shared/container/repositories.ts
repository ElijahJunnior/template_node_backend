import { container } from "tsyringe";

import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";
import { IExamplesRepositoryMemory } from "@modules/example/repositories/implementations/IExamplesRepositoryMemory";
import { SessionsRepositoryInMemory } from "@modules/user/repositories/implementations/SessionsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/user/repositories/implementations/UsersRepositoryInMemory";
import { ISessionsRepository } from "@modules/user/repositories/ISessionsRepository";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

container.registerSingleton<IExamplesRepository>(
  "ExamplesRepository",
  IExamplesRepositoryMemory
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepositoryInMemory
);

container.registerSingleton<ISessionsRepository>(
  "SessionsRepository",
  SessionsRepositoryInMemory
);
