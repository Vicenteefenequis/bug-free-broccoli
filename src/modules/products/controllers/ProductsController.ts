import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return response.json(products);
  }
}
