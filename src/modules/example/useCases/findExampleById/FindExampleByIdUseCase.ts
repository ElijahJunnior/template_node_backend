import { inject, injectable } from "tsyringe";

import { IExampleDTO } from "@modules/example/dtos/IExampleDTO";
import { ExampleMap } from "@modules/example/mappers/ExampleMap";
import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";

import { FindExampleByIdError } from "./FindExampleByIdError";

@injectable()
export class FindExampleByIdUseCase {
  constructor(
    @inject("ExamplesRepository")
    private readonly examplesRepository: IExamplesRepository
  ) {}

  async execute(id: string): Promise<IExampleDTO> {
    const example = await this.examplesRepository.findById(id);

    if (example === undefined) {
      throw new FindExampleByIdError.ExampleNotExists();
    }

    const mappedExample = ExampleMap.toExampleDTO(example);

    return mappedExample;
  }
}
