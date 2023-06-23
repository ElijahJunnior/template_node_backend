import { AppError } from "@shared/errors/AppError";

export namespace UserError {
  export class UserEmailAlreadyExists extends AppError {
    constructor() {
      super("O e-mail informado já está em uso!");
    }
  }
}
