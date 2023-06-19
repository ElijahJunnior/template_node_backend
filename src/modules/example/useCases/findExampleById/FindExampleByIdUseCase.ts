import { inject, injectable } from "tsyringe";

import { IExempleDTO } from "@modules/example/dtos/IExampleDTO";
import { ExampleMap } from "@modules/example/mappers/ExampleMap";
import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";

import { FindExampleByIdError } from "./FindExampleByIdError";

@injectable()
export class FindExampleByIdUseCase {
  constructor(
    @inject("ExamplesRepository")
    private readonly examplesRepository: IExamplesRepository
  ) {}

  async execute(id: string): Promise<IExempleDTO> {
    const example = await this.examplesRepository.findById(id);

    if (example === undefined) {
      throw new FindExampleByIdError.ExempleNotExists();
    }

    const mappedExample = ExampleMap.toExampleDTO(example);

    return mappedExample;
  }
}
