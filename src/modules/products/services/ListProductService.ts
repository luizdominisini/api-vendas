import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = ProductRepository.find();
    return products;
  }
}

export default ListProductService;
