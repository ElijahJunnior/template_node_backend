import fs from "fs";
import { resolve } from "path";

import upload from "@config/multerUpload";

async function cleanTempFiles(files: string[]): Promise<void> {
  for (const file of files) {
    const path = resolve(upload.tmp_folder, file);

    try {
      await fs.promises.stat(path);
    } catch {}

    await fs.promises.unlink(path);
  }
}

export { cleanTempFiles };
