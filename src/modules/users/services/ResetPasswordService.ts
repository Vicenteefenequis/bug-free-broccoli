import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from "date-fns"
import AppError from '@shared/errors/AppError';
import UsersRepositories from '../typeorm/repositories/UsersRepositories';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs'



interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepositories);
    const userTokensRepository = getCustomRepository(UserTokensRepository)


    const userToken = await userTokensRepository.findByToken(token)

    if(!userToken) throw new AppError('User Token does not exists.')


    const user = await usersRepository.findById(userToken.user_id)

    if(!user) throw new AppError('User does not exists.')


    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2)


    if(isAfter(Date.now(), compareDate)) throw new AppError('Token expired.')

     user.password = await hash(password, 8)

     await usersRepository.save(user)
  }
}

export default ResetPasswordService;
