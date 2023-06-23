import { instanceToInstance } from "class-transformer";

import { IUserDTO } from "../dtos/IUserDTO";
import { User } from "../entities/User";

export class UserMap {
  static toUserDTO({ created_at, email, id, name, verified }: User): IUserDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      created_at,
      verified,
    });

    return user;
  }
}
