import fs from 'fs';
import path from 'path';
import mime from 'mime';
import asw, { S3 } from 'aws-sdk';
import ISorageProvider from '../models/IStorageProvider';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider implements ISorageProvider {
  private client: S3;
  constructor() {
    this.client = new asw.S3({
      region: 'us-east-1',
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    // Remove o arquivo da pasta upload após ele ser enviado para a aws
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
