
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email}: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('There is already a user with this email');
    }

    const user = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(user);

    return user;
  }
}

export default CreateCustomerService;
