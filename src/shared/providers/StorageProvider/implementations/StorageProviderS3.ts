import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@config/multerImageUpload";

import { IStorageProvider } from "../IStorageProvider";

class StorageProviderS3 implements IStorageProvider {
  private readonly client: S3;
  private readonly bucket_name: string;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });

    this.bucket_name = process.env.AWS_BUCKET as string;
  }

  async save(file: string, folder: string): Promise<string> {
    const filePath = resolve(upload.tmp_folder, file);

    const fileContent = await fs.promises.readFile(filePath);

    const fileContentType = mime.getType(filePath);

    await this.client
      .putObject({
        Bucket: `${this.bucket_name}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: fileContentType ?? undefined,
      })
      .promise();

    await fs.promises.unlink(filePath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET as string}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { StorageProviderS3 };
