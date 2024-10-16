import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import User from '../typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
