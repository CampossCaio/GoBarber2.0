import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenrepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (!checkEmailExists) {
      throw new AppError('User does not existis.');
    }

    const { token } = await this.userTokenRepository.generate(
      checkEmailExists.id,
    );

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido:  ${token}`,
    );
  }
}
export default SendForgotPasswordEmailService;
