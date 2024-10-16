import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already a user with this email');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
