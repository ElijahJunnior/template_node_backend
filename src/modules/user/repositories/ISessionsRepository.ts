import { ISessionKeyDTO } from "../dtos/ISessionKeyDTO";
import { Session } from "../entities/Session";

export interface ISessionsRepository {
  create(data: ISessionKeyDTO): Promise<Session>;
  findByUser(user_id: string): Promise<Session[]>;
  findByUserToken(data: ISessionKeyDTO): Promise<Session | undefined>;
  updateToken(id: string, new_refresh_token: string): Promise<void>;
  delete(id: string): Promise<void>;
  deleteByUser(user_id: string): Promise<void>;
}
