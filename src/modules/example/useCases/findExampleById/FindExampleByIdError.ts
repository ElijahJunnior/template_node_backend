import { AppError } from "@shared/errors/AppError";

export namespace FindExampleByIdError {
  export class ExampleNotExists extends AppError {
    constructor() {
      super("O exemplo informado não existe!", 400);
    }
  }
}
