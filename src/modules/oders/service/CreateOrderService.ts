import { In } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import customersRepository from "../../customers/typeorm/repositories/CurstomersRepository";
import ProductRepository from "../../products/typeorm/repositories/ProductsRepository";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await customersRepository.findOne({
      where: { id: customer_id },
    });

    if (!customerExists) {
      throw new AppError("Could not find any customer with the given id");
    }

    const producstId = products.map((product) => product.id);

    const productsExists = await ProductRepository.findBy({
      //Se der Error tentar apenas com find
      id: In(producstId),
    });

    if (!productsExists.length) {
      throw new AppError("Could not find any product with the given id");
    }

    const existIdProducts = productsExists.map((product) => product.id);

    const checkInexistantProducts = products.filter(
      (product) => !existIdProducts.includes(product.id)
    );

    if (checkInexistantProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistantProducts[0].id}`
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        productsExists.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter((p) => p.id === product.id)[0].price,
    }));

    const order = OrdersRepository.create({
      customer: customerExists,
      order_products: serializedProducts,
    });

    await OrdersRepository.save(order);

    const { order_products } = order; 

    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        productsExists.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await ProductRepository.save(updatedProductQuantity);

    return order;
  }
}
export default CreateOrderService;
