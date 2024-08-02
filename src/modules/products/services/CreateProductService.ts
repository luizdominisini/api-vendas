// export class UserController {
//   users() {
//       return UserRepository.findByName("Timber", "Saw")
//   }
// }

import AppError from "../../../shared/errors/AppError";
import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsExist = await ProductRepository.findByName(name);

    if (productsExist) {
      throw new AppError("There is already one produty with this name");
    }

    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await ProductRepository.save(product);

    return product;
  }
}

export default CreateProductService;
