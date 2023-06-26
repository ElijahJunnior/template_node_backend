import { ISessionKeyDTO } from "@modules/user/dtos/ISessionKeyDTO";
import { Session } from "@modules/user/entities/Session";

import { ISessionsRepository } from "../ISessionsRepository";

export class SessionsRepositoryInMemory implements ISessionsRepository {
  private readonly sessions: Session[];

  constructor() {
    if (this.sessions == null) {
      this.sessions = [];
    }
  }

  async create({ refresh_token, user_id }: ISessionKeyDTO): Promise<Session> {
    const session = new Session();

    Object.assign(session, {
      user_id,
      refresh_token,
    });

    this.sessions.push(session);

    return session;
  }

  async findByUser(user_id: string): Promise<Session[]> {
    const user_sessions = this.sessions.filter(
      (session) => session.user_id === user_id
    );

    if (user_sessions == null) {
      return [];
    } else {
      return user_sessions;
    }
  }

  async findByUserToken({
    refresh_token,
    user_id,
  }: ISessionKeyDTO): Promise<Session | undefined> {
    const session = this.sessions.find(
      (session) =>
        session.user_id === user_id && session.refresh_token === refresh_token
    );

    return session;
  }

  async updateToken(id: string, new_refresh_token: string): Promise<void> {
    const session = this.sessions.find((session) => session.id === id);

    if (session != null) {
      session.refresh_token = new_refresh_token;
    }
  }

  async delete(id: string): Promise<void> {
    const session_index = this.sessions.findIndex(
      (session) => session.id === id
    );

    if (session_index >= 0) {
      this.sessions.splice(session_index, 1);
    }
  }
}
