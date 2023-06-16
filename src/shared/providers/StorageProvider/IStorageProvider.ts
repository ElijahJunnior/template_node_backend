interface IStorageProvider {
  save(file: string, out_folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
