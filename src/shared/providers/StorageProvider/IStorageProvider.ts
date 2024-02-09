import { Readable } from "stream";

export type ACLType =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control";

export interface IStorageProvider {
  uploadFile(file: string, folder?: string, acl?: ACLType): Promise<string>;
  delete(file: string, folder?: string): Promise<void>;
  streamDownload(file: string, folder?: string): Promise<Readable>;
}
