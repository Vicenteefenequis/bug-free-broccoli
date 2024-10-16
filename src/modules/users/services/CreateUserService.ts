import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const userExists = await usersRepository.findByName(name);

    if (userExists) {
      throw new AppError('There is already a user with this name');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      avatar,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
