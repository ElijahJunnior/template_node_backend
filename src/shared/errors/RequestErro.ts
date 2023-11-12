import { AppError } from "./AppError";

export namespace RequestErro {
  export class InvalidToken extends AppError {
    constructor() {
      super("Token inválido!", 401);
    }
  }

  export class InvalidRole extends AppError {
    constructor() {
      super("Você não tem permissão para acessar essa rota!", 401);
    }
  }
}
