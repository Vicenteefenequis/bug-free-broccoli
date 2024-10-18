
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';


interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepositories);
    const userTokenRepository = getCustomRepository(UserTokensRepository)

    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('User not found');

    const token = await userTokenRepository.generate(user.id)

    console.log(token)
  }
}

export default SendForgotPasswordEmailService;
