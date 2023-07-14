export interface ISessionDTO {
  user: {
    id: string;
    name: string;
    email: string;
    validated: boolean;
    created_at: Date;
  };
  token: string;
  refresh_token: string;
}
