import { Request, Response } from 'express';
import ListUserService from '../services/ListUserService';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return response.json(user);
  }
}
