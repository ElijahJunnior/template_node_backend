import { v4 as uuid } from "uuid";

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  verified: boolean;
  created_at: Date;

  constructor() {
    if (this.id == null) {
      this.id = uuid();
    }

    if (this.verified == null) {
      this.verified = false;
    }

    if (this.created_at == null) {
      this.created_at = new Date();
    }
  }
}
