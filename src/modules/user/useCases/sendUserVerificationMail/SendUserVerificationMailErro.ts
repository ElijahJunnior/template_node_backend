import { AppError } from "@shared/errors/AppError";

export namespace SendUserVerificationMailErro {
  export class UserAccountAlreadyVerified extends AppError {
    constructor() {
      super("A conta de usuário já foi verificada!");
    }
  }

  export class UserAccountVerificationError extends AppError {
    constructor() {
      super("Erro ao verificar a conta de usuário!");
    }
  }

  export class UserAccountVerificationTimeExceeded extends AppError {
    constructor() {
      super("O prazo da verificação expirou!");
    }
  }
}
