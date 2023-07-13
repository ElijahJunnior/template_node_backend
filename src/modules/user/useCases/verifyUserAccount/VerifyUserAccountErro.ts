import { AppError } from "@shared/errors/AppError";

export namespace VerifyUserAccountErro {
  export class InvalidActivationKey extends AppError {
    constructor() {
      super("A Chave de Ativação informada é inválida!");
    }
  }

  export class ExpiredActivationKey extends AppError {
    constructor() {
      super("A Chave de Ativação informada está expirada!");
    }
  }
}
