import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllByIds(ids: string[]): Promise<Product[]> {
     const existsProducts = await this.find({
      where: {
        id: In(ids)
      }
    })
    return existsProducts
  }

}
