import { IUserCreateDTO } from "@modules/user/dtos/IUserCreateDTO";
import { User } from "@modules/user/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private readonly users: User[];

  constructor() {
    this.users = [];
  }

  async create({ email, name, password }: IUserCreateDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
