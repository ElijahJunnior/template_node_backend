import { AppError } from "@shared/errors/AppError";

export namespace DeleteExampleError {
  export class ExampleNotExists extends AppError {
    constructor() {
      super("O exemplo informado não existe!", 400);
    }
  }
}
