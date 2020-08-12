import IMailProvider from '../models/IMailProvider';
import ISendEmailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private message: ISendEmailDTO[] = [];
  public async sendMail(message: ISendEmailDTO): Promise<void> {
    this.message.push(message);
  }
}
