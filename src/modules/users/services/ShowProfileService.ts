import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';


interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({user_id}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findById(user_id);

    if(!user) throw new AppError('User not found')

    return user;
  }
}

export default ShowProfileService;
