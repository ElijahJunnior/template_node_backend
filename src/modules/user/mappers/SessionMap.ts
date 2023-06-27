import { ISessionDTO } from "../dtos/ISessionDTO";
import { User } from "../entities/User";

export class SessionMap {
  static toSessionDTO({
    user,
    token,
    refresh_token,
  }: {
    user: User;
    token: string;
    refresh_token: string;
  }): ISessionDTO {
    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        created_at: user.created_at,
      },
      token,
      refresh_token,
    };

    return session;
  }
}
