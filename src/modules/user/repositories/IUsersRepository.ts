import { IUserCreateDTO } from "../dtos/IUserCreateDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
