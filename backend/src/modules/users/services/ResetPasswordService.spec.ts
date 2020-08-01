import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokenRepository from '../repositories/fake/FakeUserTokenRepository';
import ResetPasswordService from '../services/ResetPasswordService';
import FakeHasProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHasProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHasProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('shoud not be able reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existin user',
    );

    await expect(
      resetPassword.execute({
        token: token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password  if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    // Modifica o método now para que ele retorne a hora atual somada a 2 horas.
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);

    const updatedUser = await fakeUsersRepository.findById(user.id);
  });
});
