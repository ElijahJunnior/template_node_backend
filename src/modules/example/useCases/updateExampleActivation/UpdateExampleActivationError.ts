import { AppError } from "@shared/errors/AppError";

export namespace UpdateExampleActivationError {
  export class ExampleNotExists extends AppError {
    constructor() {
      super("O Exemplo informado não existe!", 400);
    }
  }
}
