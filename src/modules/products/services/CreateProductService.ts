import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    try {
      const productsExist = await ProductRepository.findOneBy({ name });

      if (productsExist) {
        throw new AppError("There is already one product with this name");
      }

      const product = ProductRepository.create({
        name,
        price,
        quantity,
      });

      await ProductRepository.save(product);

      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default CreateProductService;
