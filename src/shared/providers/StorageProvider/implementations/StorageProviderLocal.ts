import fs from "fs";
import { resolve } from "path";

import upload from "@config/multerImageUpload";

import { IStorageProvider } from "../IStorageProvider";

class StorageProviderLocal implements IStorageProvider {
  async save(file: string, out_folder: string): Promise<string> {
    const origin_path = resolve(upload.tmp_folder, file);

    const out_folder_full = resolve(upload.tmp_folder, out_folder);

    if (!fs.existsSync(out_folder_full)) {
      await fs.promises.mkdir(out_folder_full, { recursive: true });
    }

    const out_path = resolve(out_folder_full, file);

    await fs.promises.rename(origin_path, out_path);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const path = resolve(upload.tmp_folder, folder, file);

    try {
      await fs.promises.stat(path);
    } catch {}

    await fs.promises.unlink(path);
  }
}

export { StorageProviderLocal };
