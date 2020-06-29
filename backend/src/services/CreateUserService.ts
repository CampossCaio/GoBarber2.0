import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

interface Request {
  name: string,
  email: string,
  password: string
}


class CreateUserService {

  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserexist = await userRepository.findOne({
      where: { email }
    });

    if (checkUserexist) {
      throw new AppError('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;

  }

}
export default CreateUserService;
