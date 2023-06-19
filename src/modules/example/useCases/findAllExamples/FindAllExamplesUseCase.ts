import { inject, injectable } from "tsyringe";

import { IExempleDTO } from "@modules/example/dtos/IExampleDTO";
import { ExampleMap } from "@modules/example/mappers/ExampleMap";
import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";

@injectable()
export class FindAllExamplesUseCase {
  constructor(
    @inject("ExamplesRepository")
    private readonly examplesRepository: IExamplesRepository
  ) {}

  async execute(): Promise<IExempleDTO[]> {
    const examples = await this.examplesRepository.findAll();

    const mappedExamples = examples.map((example) =>
      ExampleMap.toExampleDTO(example)
    );

    return mappedExamples;
  }
}
