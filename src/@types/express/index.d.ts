declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
      email: string;
      name: string;
      validated: boolean;
      created_at: Date;
    };
  }
}
