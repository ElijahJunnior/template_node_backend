import { inject, injectable } from "tsyringe";

import { IUserDTO } from "@modules/user/dtos/IUserDTO";
import { UserError } from "@modules/user/errors/UserError";
import { UserMap } from "@modules/user/mappers/UserMap";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";

interface IUpdateUser {
  user_id: string;
  name: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {}

  async handle({ user_id, name }: IUpdateUser): Promise<IUserDTO> {
    const user = await this.usersRepository.findById(user_id);

    if (user === undefined) {
      throw new UserError.UserNotFound();
    }

    user.name = name;

    await this.usersRepository.update(user);

    return UserMap.toUserDTO(user);
  }
}
