import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
