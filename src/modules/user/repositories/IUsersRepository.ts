import { IUserCreateDTO } from "../dtos/IUserCreateDTO";
import { IUserUpdateDTO } from "../dtos/IUserUpdateDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
  create(data: IUserCreateDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  update(date: IUserUpdateDTO): Promise<void>;
  updatePassword(user_id: string, new_password: string): Promise<void>;
  updateVerificationKey(
    user_id: string,
    new_verification_key: string
  ): Promise<void>;
  updateForgotPasswordKey(
    user_id: string,
    new_forgot_password_key: string
  ): Promise<void>;
}
