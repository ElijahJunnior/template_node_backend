import { IUserCreateDTO } from "@modules/user/dtos/IUserCreateDTO";
import { User } from "@modules/user/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private readonly users: User[];

  private cloneUser(user: User): User {
    const user_clone = {
      ...user,
    };

    return user_clone;
  }

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

    return this.cloneUser(user);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);

    return user !== undefined ? this.cloneUser(user) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined ? this.cloneUser(user) : undefined;
  }

  async update(new_data: User): Promise<void> {
    const user = this.users.find((user) => user.id === new_data.id);

    if (user != null) {
      user.name = new_data.name;
    }
  }
}
