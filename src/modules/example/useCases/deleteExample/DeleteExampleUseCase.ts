import { inject, injectable } from "tsyringe";

import { IExamplesRepository } from "@modules/example/repositories/IExamplesRepository";

import { DeleteExampleError } from "./DeleteExampleError";

@injectable()
export class DeleteExampleUseCase {
  constructor(
    @inject("ExamplesRepository")
    private readonly examplesRepository: IExamplesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const example = await this.examplesRepository.findById(id);

    if (example === undefined) {
      throw new DeleteExampleError.ExampleNotExists();
    }

    await this.examplesRepository.delete(id);
  }
}
