import AppError from "../../../shared/errors/AppError";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
//Importar Product apenas para tipar o retorno

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError("Product not found");
    }

    await ProductRepository.remove(product);
  }
}

export default DeleteProductService;
