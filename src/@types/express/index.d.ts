import { IPayloadJwt } from "@shared/types/IPayloadJwt";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      auth?: IPayloadJwt;
    }
  }
}
