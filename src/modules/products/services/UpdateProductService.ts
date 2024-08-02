import AppError from "../../../shared/errors/AppError";
import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class ShowProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new AppError("Product not found");
    }

    const productsExist = await ProductRepository.findByName(name);

    if (productsExist) {
      throw new AppError("There is already one product with this name");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return product;
  }
}

export default ShowProductService;
