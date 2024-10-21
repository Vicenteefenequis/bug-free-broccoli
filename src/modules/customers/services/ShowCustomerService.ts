
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomerRepository';


interface IRequest {
  id: string;
}

class ShowProfileService {
  public async execute({id}: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if(!customer) throw new AppError('Customer not found')

    return customer;
  }
}

export default ShowProfileService;
