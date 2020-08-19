import fs from 'fs';
import path from 'path';
import ISorageProvider from '../models/IStorageProvider';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider implements ISorageProvider {
  public async saveFile(file: string): Promise<string> {
    /**
     * Movendo o arquivo de uma pasta para a outra.
     */
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
